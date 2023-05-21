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
router.get('/author', async (req, res, next) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM author');
    return res.json({ authors: rows });
  } catch (err) {
    return next(err);
  }
});
router.get('/publisher', async (req, res, next) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM publisher');
    return res.json({ publisher: rows });
  } catch (err) {
    return next(err);
  }
});

router.post('/addpub', async function (req, res, next) {
  console.log(req.body)
  const pubname = req.body.pubname;
  const pubphone = req.body.pubphone;
  const puburl = req.body.puburlc;

  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();

  try {
    let results = await conn.query(
      "INSERT INTO publisher(pub_name, pub_phone, pub_url) VALUES(?, ?, ?);",
      [pubname,pubphone, puburl]
    )
    console.log(results)


    await conn.commit()
    res.send("success!");
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    console.log('finally')
    conn.release();
  }
});

router.post('/addauthor', async function (req, res, next) {
  console.log(req.body)
  const authfname = req.body.authfname;
  const authlname = req.body.authlname;
  const authalias = req.body.authlias;

  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();

  try {
    let results = await conn.query(
      "INSERT INTO author(author_fn, author_ln,author_alias) VALUES(?, ?, ?);",
      [authfname, authlname, authalias]
    )
    console.log(results)


    await conn.commit()
    res.send("success!");
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    console.log('finally')
    conn.release();
  }
});






exports.router = router;
