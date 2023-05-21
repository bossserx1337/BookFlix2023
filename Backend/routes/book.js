const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/book", async function (req, res, next) {
  try {
    let [books, fields] = await pool.query(`
    SELECT book.book_id, book.book_name, book.book_img, book.book_desc, book.author_id, book.pub_id , GROUP_CONCAT(book_type.book_type_name) AS 'tag'
    FROM book
    JOIN book_with_type ON book.book_id = book_with_type.book_id
    JOIN book_type ON book_with_type.book_type_id = book_type.book_type_id
    GROUP BY book.book_id;


    `)
    let [tags, fields2] = await pool.query(`SELECT  book_type_name as 'tag' FROM  book_type`)

    return res.json({
      book: books,
      tag: tags
    });
  } catch (err) {
    return next(err)
  }
});

router.get("/book/:bookid/chapter/", async function (req, res, next) {
  try {

    let [book, _] = await pool.query(`SELECT *, concat(author_fn,' ',author_ln) as 'author_name' FROM project.book join author using (author_id)
    join publisher using (pub_id) where book_id = ${req.params.bookid}`)
    let [chapter, fields] = await pool.query(`SELECT * FROM chapter where book_id = ${req.params.bookid}`)
    let [tag, fields2] = await pool.query(`SELECT  book_type_name as 'tag', book_name FROM project.book join author using (author_id)
    join publisher using (pub_id) join book_with_type using (book_id) join book_type using (book_type_id) where book_id =  ${req.params.bookid}`)

    return res.json({
      book: book,
      chapter: chapter,
      tag: tag
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



exports.router = router;
