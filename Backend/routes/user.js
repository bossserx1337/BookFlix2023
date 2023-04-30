const express = require("express");
const pool = require("../config");
const bcrypt = require('bcrypt')
const Joi = require('joi')
const { generateToken } = require("../utils/token");
const { isLoggedIn } = require('../middlewares')

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
        "SELECT customer_email FROM customer WHERE customer_email = ?",
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
        "SELECT customer_phone FROM customer WHERE customer_phone = ?",
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
    mobile: Joi.string().required().custom(phoneValidator),
    first_Name: Joi.string().required().max(150),
    last_Name: Joi.string().required().max(150),
    password: Joi.string().required().custom(passwordValidator),
    confirm_password: Joi.string().required().valid(Joi.ref('password')),
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
    const first_name = req.body.first_Name
    const last_name = req.body.last_Name
    const email = req.body.email
    const mobile = req.body.mobile

    try {
        await conn.query(
            'INSERT INTO customer(customer_password, customer_firstN, customer_lastN,customer_email, customer_phone) ' +
            'VALUES ( ?, ?, ?, ?, ?)', [password, first_name, last_name, email, mobile]
        )
        conn.commit()
        res.status(201).send('Created succesful')
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
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
            'SELECT * FROM customer WHERE customer_email=?',
            [email]
        )
        const user = users[0]
        if (!user) {
            throw new Error('Incorrect Email or password')
        }

        // Check if password is correct
        if (!(await bcrypt.compare(password, user.customer_password))) {
            throw new Error('Incorrect Email or password')
        }

        // Check if token already existed
        const [tokens] = await conn.query(
            'SELECT * FROM tokens WHERE customer_id=?',
            [user.customer_id]
        )
        let token = tokens[0]?.token
        if (!token) {
            // Generate and save token into database
            token = generateToken()
            await conn.query(
                'INSERT INTO tokens(customer_id, token) VALUES (?, ?)',
                [user.customer_id, token]
            )
        }

        conn.commit()
        res.status(200).json({ 'token': token })
    } catch (error) {
        conn.rollback()
        res.status(400).json(error.toString())
        console.log(error)
    } finally {
        conn.release()
    }
})
router.get('/user/me', isLoggedIn, async (req, res, next) => {
    // req.user ถูก save ข้อมูล user จาก database ใน middleware function "isLoggedIn"
    res.json(req.user)
})
exports.router = router
