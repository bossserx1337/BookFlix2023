const express = require("express");
const pool = require("../config");

router = express.Router();

router.put('/customer', async (req, res, next) => {
console.log(req.body)
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  // let myDate= new Date();

  try {
    const results = await conn.query(
      'UPDATE customer SET status = "R" WHERE customer_id=?',
      [req.body.customerid]
    );
    const results1 = await conn.query(
      'UPDATE buy_package SET pack_start = CURRENT_DATE() , pack_end = DATE_ADD(NOW(), INTERVAL 30 DAY) WHERE pack_id =?',
      [req.body.payid ]
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
