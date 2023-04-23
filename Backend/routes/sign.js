const express = require("express");
const pool = require("../config");

router = express.Router();

router.post('/signup', async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();

  try {
    const [check_email, fields] = await conn.query("SELECT * FROM customer WHERE customer_email=?;", [email]);

    if (check_email.length > 0) {
      return res.status(400).send('Email already exists');
    }
    const results = await conn.query("INSERT INTO customer(customer_password, customer_firstN, customer_lastN, customer_email, customer_phone) VALUES(?,?,?,?,?);", [
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


router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const conn = await pool.getConnection();
    const [customerResult] = await conn.query(
      "SELECT * FROM customer WHERE customer_email = ? AND customer_password = ?",
      [email, password]
    );
    if (customerResult.length > 0) {
      // User exists as a customer with correct email and password
      const user = customerResult[0];
      conn.release();
      return res.status(200).json({ message: 'Sign in successful', user });
    }
    const [adminResult] = await conn.query(
      "SELECT * FROM admin WHERE admin_email = ? AND admin_password = ?",
      [email, password]
    );
    if (adminResult.length > 0) {
      // User exists as an admin with correct email and password
      const user = adminResult[0];
      conn.release();
      return res.status(200).json({ message: 'Sign in successful', user });
    }
    // Invalid email or password
    conn.release();
    return res.status(401).json({ message: 'Invalid email or password' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while processing your request' });
  }
});

exports.router = router;
