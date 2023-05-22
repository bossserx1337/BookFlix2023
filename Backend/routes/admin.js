const express = require("express");
const pool = require("../config");
const Joi = require('joi')

router = express.Router();

const PublisherSchema = Joi.object({
  pubname: Joi.string().required(),
  pubphone: Joi.string().required().regex(/^0\d{9}$/),
  puburl : Joi.string().uri().required()
})
const AuthorSchema = Joi.object({
  authfname: Joi.string().required(),
  authlname: Joi.string().required(),
  authalias : Joi.string().required()
})

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
  try {
    await PublisherSchema.validateAsync(req.body, { abortEarly: false })
    console.log(req.body)
} catch (err) {
    console.log(err.message)
    return res.status(400).json(err.message)
}
  console.log(req.body)
  const pubname = req.body.pubname;
  const pubphone = req.body.pubphone;
  const puburl = req.body.puburl;

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
  try {
    await AuthorSchema.validateAsync(req.body, { abortEarly: false })
    console.log(req.body)
} catch (err) {
    console.log(err)
    return res.status(400).json(err.message)
}
  console.log(req.body)
  const authfname = req.body.authfname;
  const authlname = req.body.authlname;
  const authalias = req.body.authalias;

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

router.post('/addtype', async function (req, res, next) {

  const bookid = req.body.bookid;
  const booktypeid = req.body.booktypeid;


  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();

  try {
    let check1 = await conn.query(
      "select * from book_with_type where book_id  = ? and book_type_id = ?  ",
      [bookid,booktypeid]
    )
    console.log(check1[0])
    if ((check1[0].length == 0)) {
      await conn.query(
        "INSERT INTO book_with_type (book_id, book_type_id) values(?,?)",
        [bookid,booktypeid])
    }
    else{
      return res.status(401).send('This Tags alrdy in Book')
    }



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



router.delete('/book/:bookid', async (req, res, next) => {
  try {
    await pool.query('SET FOREIGN_KEY_CHECKS = 0')
    const [rows, fields] = await pool.query('DELETE FROM book WHERE book_id = ?', req.params.bookid);
    await pool.query('SET FOREIGN_KEY_CHECKS = 1')
    return res.status(200).json({ Book : rows});
  } catch (err) {
    return next(err);
  }
});

router.get('/nonapprove', async (req, res, next) => {
  try {
    const [rows, fields] = await pool.query("SELECT pay_id, pack_id, user_id, user_status,pay_bill FROM project.buy_package join user  using (user_id) where user_status = 'WT' and user_role != 'admin';");
    return res.json({ packages: rows });
  } catch (err) {
    return next(err);
  }
});

exports.router = router;
