const express = require("express");
const pool = require("../config");
const { isLoggedIn } = require("../middlewares");

router = express.Router();

router.post('/favorite', isLoggedIn, async function (req, res, next) {

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  const bookid = req.body.book_id;

  try {
    // Check if the book is already in the customer's favorites
    const checkFavoriteQuery = `      SELECT COUNT(*) as count      FROM favorite      WHERE book_id = ? AND user_id = ?    `;
    const [rows, fields] = await conn.query(checkFavoriteQuery, [bookid, req.user.user_id]);

    // If the book is already in the customer's favorites, return a response indicating that
    if (rows[0].count > 0) {
      res.status(200).json({ message: 'Book is already in favorites' });
    } else {
      // If the book is not in the customer's favorites, add it to the favorites table
      const addFavoriteQuery = `
        INSERT INTO favorite (book_id, user_id)
        VALUES (?, ?)
      `;
      await conn.query(addFavoriteQuery, [bookid, req.params.customerid]);

     return res.status(200).json({ message: 'Book added to favorites' });
    }
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    conn.commit();
    console.log('finally');
    conn.release();
  }
});

router.delete('/favorite/:bookid',  isLoggedIn,async function (req, res, next) {
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  try {
    await conn.query("DELETE FROM favorite WHERE book_id = ? and user_id = ?;",   [req.params.bookid, req.user.user_id])
    return res.status(200).send("success!");
  } catch (err) {
    console.log(err)
    await conn.rollback();
    next(err);
  } finally {
    conn.commit();
    console.log('finally')
    conn.release();
  }
})

router.get("/favorite",isLoggedIn, async function (req, res, next) {
  try {

    let [rows , fields] = await pool.query(`SELECT * FROM favorite join book using(book_id) where  user_id = ?`, req.user.user_id)

    return res.json( {
      favorite: rows
    });
  } catch (err) {
    return next(err)
  }
});

exports.router = router;
