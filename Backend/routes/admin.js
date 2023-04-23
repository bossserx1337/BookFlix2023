const express = require("express");
const pool = require("../config");

router = express.Router();
router.get("/checkadmin/:email", async function (req, res, next) {
  try {

    let [rows , fields] = await pool.query(`SELECT * FROM admin where admin_email = ?`, req.params.email)
    if (admin.length > 0) {
      return res.send('Yes');
    }
  } catch (err) {
    return next(err)
  }
});

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
    let [customer] = await pool.query(`SELECT * FROM customer where customer_email = ? `,  req.params.email)
    console.log(customer)
    if(customer.length > 0){
      return res.json( {
        userinfo: customer
      });
    }
    let [admin] = await pool.query(`SELECT * FROM admin where admin_email = ? `,  req.params.email)
    if(admin.length > 0){
      return res.json( {
        userinfo: admin
      });
    }
    return res.status(400).json({ message: 'User not found' });
  } catch (err) {
    return next(err)
  }
});
router.get('/buypackage', async (req, res, next) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM buy_package');
    return res.json({ packages: rows });
  } catch (err) {
    return next(err);
  }
});
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
