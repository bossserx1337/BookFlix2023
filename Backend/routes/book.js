const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/book", async function (req, res, next) {
  try {

    let [rows , fields] = await pool.query(`SELECT * FROM book`)

    return res.json( {
      book: rows
    });
  } catch (err) {
    return next(err)
  }
});
router.post('/addbook' , async function (req, res, next) {
  console.log(req.body)
  const bookname = req.body.bookname;
  const bookdesc = req.body.bookdesc;
  const bookimg = req.body.bookimg;
  const authorid = req.body.authorid;
  const pubid = req.body.pubid;

  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();

  try {
    let results = await conn.query(
      "INSERT INTO book( book_id,book_name, book_desc, book_img, author_id, pub_id) VALUES(?, ?, ?, ?, ?, ?);",
      [ 1, bookname, bookdesc, bookimg, authorid, pubid ]
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
