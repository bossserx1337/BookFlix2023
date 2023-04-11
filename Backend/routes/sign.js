const express = require("express");
const pool = require("../config");

router = express.Router();

router.post('/signup', async (req, res, next) => {
    const { firstName, lastName, username, email, phoneNumber, password } = req.body;

    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();

    try {
        const [check_email, fields] = await conn.query("SELECT * FROM customer WHERE customer_email=?;", [email]);

        if (check_email.length > 0) {
            console.log('Email already exists in database');

            return  res.status(400).send('Email already exists' );
        }
        const results = await conn.query("INSERT INTO customer(customer_id, customer_username, customer_password, customer_firstN, customer_lastN, customer_email, customer_phone) VALUES(?,?,?,?,?,?,?);", [
            3,
            username,
            password,
            firstName,
            lastName,
            email,
            phoneNumber
        ]);

        await conn.commit()
        res.status(200).json({ message: 'Form submitted successfully' });
    } catch (err) {
        await conn.rollback();
        console.error(err);
        res.status(500).json({ message: 'An error occurred while saving data' });
    } finally {
        console.log('finally')
        conn.release();
    }
});


// router.get("/signin", async function (req, res, next) {
//     try {

//         let [rows, fields] = await pool.query(`SELECT * FROM admin`)

//         return res.json({
//             admin: rows
//         });
//     } catch (err) {
//         return next(err)
//     }
// });

exports.router = router;
