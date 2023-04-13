const express = require('express');
const pool = require('../config');

const router = express.Router();

// Get all packages
router.get('/packages', async (req, res, next) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM packages');
    return res.json({ packages: rows });
  } catch (err) {
    return next(err);
  }
});

// Add a package
router.post('/packages', async (req, res, next) => {
  const { packageName, packagePrice, packageDescription } = req.body;

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    const results = await conn.query(
      'INSERT INTO packages(package_name, package_price, package_description) VALUES(?, ?, ?)',
      [packageName, packagePrice, packageDescription]
    );

    await conn.commit();
    res.send('success!');
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    conn.release();
  }
});

module.exports = router;
