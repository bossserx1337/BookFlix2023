const express = require('express');
const pool = require('../config');

const path = require("path")
const router = express.Router();
const multer = require('multer')
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'C:/Users/Bossserx/Documents/GitHub/Project-WebPro-RomeBoss/Backend/static/uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

// Get all packages
router.get('/packages', async (req, res, next) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM package');
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
router.post('/buypackage', upload.single('bill_image'), async function (req, res, next) {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  console.log(req.body)
  const packid = req.body.packid;
  const customerid = req.body.customerid;
  const image = "/uploads/" + req.file.filename;

  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  try {
    const results = await conn.query(
      'INSERT INTO buy_package(pack_id,customer_id, pay_bill) VALUES(?, ?, ?)',
      [packid, customerid, image]
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


exports.router = router;

