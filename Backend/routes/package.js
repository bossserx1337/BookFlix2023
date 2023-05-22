const express = require('express');
const pool = require('../config');

const path = require("path")
const router = express.Router();
const multer = require('multer');
const { isLoggedIn } = require('../middlewares');
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

// Get all packages
router.get('/packages', async (req, res, next) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM package');
    return res.json({ packages: rows });
  } catch (err) {
    return next(err);
  }
});

// Add a package ไม่ได้ใช้
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


router.post('/buypackage', isLoggedIn ,upload.single('bill_image'), async function (req, res, next) {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }

  const packid = req.body.packid;
  const image = "/uploads/" + req.file.filename;

  let mydate;
  if (packid == 1) {
    mydate = 'DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL 1 MONTH)';
  } else if (packid == 2) {
    mydate = 'DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL 6 MONTH)';
  } else {
    mydate = 'DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL 12 MONTH)';
  }

  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  try {
    const response_wt = await conn.query("update user set user_status = 'WT' where user_id = ?", req.user.user_id)
    const results = await conn.query(
      'INSERT INTO buy_package(pack_id, user_id, pay_bill, pack_start, pack_end) VALUES (?, ?, ?, CURRENT_TIMESTAMP(), ' + mydate + ')',
      [packid, req.user.user_id, image]
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
router.get('/buypackage',  isLoggedIn ,async (req, res, next) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM buy_package');
    return res.json({ packages: rows });
  } catch (err) {
    return next(err);
  }
});
exports.router = router;

