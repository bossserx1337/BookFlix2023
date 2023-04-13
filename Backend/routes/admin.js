const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/admin", async function (req, res, next) {
  try {

    let [rows , fields] = await pool.query(`SELECT * FROM admin`)

    return res.json( {
      admin: rows
    });
  } catch (err) {
    return next(err)
  }
});
router.get("/userinfo/:email", async function (req, res, next) {
  try {
    let [rows , fields] = await pool.query(`SELECT * FROM customer where customer_email = ? `,  req.params.email)

    console.log(rows)
    return res.json( {
    
     userinfo: rows
    });
  } catch (err) {
    return next(err)
  }
});

exports.router = router;
