const express = require("express");
const pool = require("../config");
const bcrypt = require('bcrypt')
const Joi = require('joi')
const { generateToken } = require("../utils/token");
const { isLoggedIn } = require('../middlewares')
const path = require('path');
const multer = require('multer');
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./static/uploads")
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })

router = express.Router();
const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password must be harder')
    }
    return value
}
const emailValidator = async (value, helpers) => {
    const [rows, _] = await pool.query(
        "SELECT user_email FROM user WHERE user_email = ?",
        [value]
    )
    if (rows.length > 0) {
        const message = 'This Email is already taken'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}
const phoneValidator = async (value, helpers) => {
    const [rows, _] = await pool.query(
        "SELECT user_phone FROM user WHERE user_phone = ?",
        [value]
    )
    if (rows.length > 0) {
        const message = 'This Phonenumber is already taken'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}

const signupSchema = Joi.object({
    email: Joi.string().required().email().custom(emailValidator),
    phone: Joi.string().required().custom(phoneValidator),
    firstname: Joi.string().required().max(150),
    lastname: Joi.string().required().max(150),
    password: Joi.string().required().custom(passwordValidator),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
})

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

router.post('/user/signup', async (req, res, next) => {
    try {
        await signupSchema.validateAsync(req.body, { abortEarly: false })
        console.log(req.body)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err.toString())
    }
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const password = await bcrypt.hash(req.body.password, 5)
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const phone = req.body.phone

    try {
        await conn.query(
            'INSERT INTO user(user_password, user_first_name, user_last_name, user_email, user_phone, user_role, user_status) ' +
            'VALUES ( ?, ?, ?, ?, ?, ?, ?)', [password, firstname, lastname, email, phone, 'customer', 'NR']
        )
        conn.commit()
        return res.status(201).send('Created succesful')
    } catch (err) {
        console.log(err)
        conn.rollback()
        return res.status(400).json(err.toString());
    } finally {
        conn.release()
    }
})
router.post('/user/login', async (req, res, next) => {
    try {
        await loginSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        console.log(err)
        return res.status(400).send(err)
    }
    const email = req.body.email
    const password = req.body.password

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        // Check if username is correct
        const [users] = await conn.query(
            'SELECT * FROM user WHERE user_email=?',
            [email]
        )
        const user = users[0]
        if (!user) {
            throw new Error('Incorrect Email or password')
        }

        // Check if password is correct
        if (!(await bcrypt.compare(password, user.user_password))) {
            throw new Error('Incorrect Email or password')
        }

        // Check if token already existed
        const [tokens] = await conn.query(
            'SELECT * FROM tokens WHERE user_id=?',
            [user.user_id]
        )
        let token = tokens[0]?.token
        if (!token) {
            // Generate and save token into database
            token = generateToken()
            await conn.query(
                'INSERT INTO tokens(user_id, token) VALUES (?, ?)',
                [user.user_id, token]
            )
        }

        conn.commit()
        return res.status(200).json({
            'token': token,
            'user': user
        })
    } catch (error) {
        conn.rollback()
        console.log(error)
        return res.status(400).json(error.toString())
    } finally {
        conn.release()
    }
})


router.put('/user/update/', isLoggedIn, upload.single('user_pic'), async (req, res, next) => {
    try {
        // ดึงข้อมูลจาก req.body
        const { user_first_name, user_last_name, user_phone, user_email } = req.body;
        const user_id = req.user.user_id

        // ดึงข้อมูลจาก req.file (ถ้ามีการอัปโหลดไฟล์)
        const user_pic = req.file;
        console.log(user_pic)
        if (user_pic) {
            const conn = await pool.getConnection()
            await conn.beginTransaction()
            try {
                // อัปโหลดไฟล์
                const [results, _] = await conn.query(
                    'UPDATE user SET user_first_name = ?, user_last_name = ?, user_phone = ?, user_email = ?, user_pic = ? WHERE user_id = ?',
                    [user_first_name, user_last_name, user_phone, user_email, "/uploads/" + user_pic.filename, user_id]
                )
                conn.commit()
                return res.status(201).send('Updated succesful')
            } catch (err) {
                conn.rollback()
                return res.status(400).json(err.toString());
            } finally {

                conn.release()

            }
        }
        const conn = await pool.getConnection()
        await conn.beginTransaction()
        try {
            // อัปโหลดไฟล์
            const [results, _] = await conn.query(
                'UPDATE user SET user_first_name = ?, user_last_name = ?, user_phone = ?, user_email = ? WHERE user_id = ?',
                [user_first_name, user_last_name, user_phone, user_email, user_id]
            )
            console.log(results)
            conn.commit()
            return res.status(201).send('Updated succesful')
        } catch (err) {
            conn.rollback()
            return res.status(400).json(err.toString());
        } finally {
            conn.release()
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to update profile.' });
    }
});

router.get('/user/profile', isLoggedIn, async (req, res, next) => {
    try {
        const user_id = req.user.user_id
        const [users] = await pool.query(
            'SELECT * FROM user WHERE user_id=?',
            [user_id]
        )
        const user = users[0]
        return res.status(200).json({
            'user': user
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.toString())
    }
})

exports.router = router
