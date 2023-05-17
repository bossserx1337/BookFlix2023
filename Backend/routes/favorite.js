const express = require("express");
const pool = require("../config");

router = express.Router();

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
    console.log(err)
    await conn.rollback();
    next(err);
  } finally {
    console.log('finally')
    conn.release();
  }
})

router.get("/favorite/:customerid", async function (req, res, next) {
  try {

    let [rows , fields] = await pool.query(`SELECT * FROM favorite join book using(book_id) where  customer_id = ?`, req.params.customerid)

    return res.json( {
      favorite: rows
    });
  } catch (err) {
    return next(err)
  }
});

exports.router = router;
