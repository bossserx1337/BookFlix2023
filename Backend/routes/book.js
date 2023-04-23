const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/book", async function (req, res, next) {
  try {

    let [rows, fields] = await pool.query(`SELECT * FROM book`)

    return res.json({
      book: rows
    });
  } catch (err) {
    return next(err)
  }
});

router.get("/book/:bookid/chapter/", async function (req, res, next) {
  try {

    let [book, _] = await pool.query(`SELECT * FROM book where book_id = ${req.params.bookid}`)
    let [chapter, fields] = await pool.query(`SELECT * FROM chapter where book_id = ${req.params.bookid}`)
    // console.log(book, chapter)
    // console.log(chapter)
    return res.json({
      book: book,
      chapter: chapter
    });
  } catch (err) {
    return next(err)
  }
});
router.get("/book/:bookid/chapter/:chapterid", async function (req, res, next) {
  try {
    let [chapter, _] = await pool.query(`SELECT * FROM chapter where book_id = ${req.params.bookid} LIMIT 1  OFFSET ${req.params.chapterid - 1}`)
    if (chapter == undefined) {
      res.status(404).send('Not found')
    }

    let [image, fields] = await pool.query(`SELECT * FROM chapter_image join chapter using (chapter_id)   where book_id = ${req.params.bookid} and chapter_id = ${chapter[0].chapter_id} `)

    return res.json({
      image: image,
      chapter: chapter

    });
  } catch (err) {
    return next(err)
  }
});

router.post('/addbook', async function (req, res, next) {
  console.log(req.body)
  const bookid = req.body.bookid;
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
      [bookid, bookname, bookdesc, bookimg, authorid, pubid]
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
router.put('/updatebook', async function (req, res, next) {
  console.log(req.body)
  const bookid = req.body.bookid;
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
      "UPDATE book SET book_name = ? , book_desc = ? , book_img = ? , author_id = ?, pub_id = ? WHERE book_id = ?;",
      [bookname, bookdesc, bookimg, authorid, pubid, bookid]
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
})

router.post('/favorite/:customerid', async function (req, res, next) {

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  const bookid = req.body.book_id;

  try {
    // Check if the book is already in the customer's favorites
    const checkFavoriteQuery = `      SELECT COUNT(*) as count      FROM favorite      WHERE book_id = ? AND customer_id = ?    `;
    const [rows, fields] = await conn.execute(checkFavoriteQuery, [bookid, req.params.customerid]);

    // If the book is already in the customer's favorites, return a response indicating that
    if (rows[0].count > 0) {
      res.status(200).json({ message: 'Book is already in favorites' });
    } else {
      // If the book is not in the customer's favorites, add it to the favorites table
      const addFavoriteQuery = `
        INSERT INTO favorite (book_id, customer_id)
        VALUES (?, ?)
      `;
      await conn.execute(addFavoriteQuery, [bookid, req.params.customerid]);

      res.status(200).json({ message: 'Book added to favorites' });
    }
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    console.log('finally');
    conn.release();
  }
});


router.delete('/favorite/:customerid/:bookid', async function (req, res, next) {
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  try {
    let results = await conn.query(
      "DELETE FROM favorite WHERE book_id = ? and customer_id = ?;",
      [req.params.bookid, req.params.customerid]
    )
    res.status(200).send("success!");
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    console.log('finally')
    conn.release();
  }
})




exports.router = router;
