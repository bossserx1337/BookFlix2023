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
      'UPDATE user SET user_status = "R" WHERE user_id=?',
      [req.body.customerid]
    );
    const results1 = await conn.query(
      'UPDATE buy_package SET pack_start = CURRENT_DATE() , pack_end = DATE_ADD(NOW(), INTERVAL 30 DAY) WHERE pack_id =?',
      [req.body.payid]
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
router.delete('/buypackage/:payid', async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  console.log(req.params)
  try {
    const result = await conn.query('DELETE FROM buy_package WHERE pay_id = ?', [req.params.payid])
    await conn.commit();
    console.log(result)
    res.send('success!');
  } catch (error) {
    await conn.rollback();
    next(err);
  }

})




exports.router = router;
