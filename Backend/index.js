const express = require("express")
var cors = require('cors')
const path = require("path")

const app = express();
app.use(cors())
// Statics
app.use(express.static('static'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const indexRouter = require('./routes/index')
const adminRouter = require('./routes/admin')
const signRouter = require('./routes/sign')
const bookRouter = require('./routes/book')
const packageRouter = require('./routes/package')
const userRouter = require('./routes/user')




app.use(indexRouter.router)
app.use(adminRouter.router)
app.use(signRouter.router)
app.use(bookRouter.router)
app.use(packageRouter.router)
app.use(userRouter.router)


app.listen(3001, () => {
  console.log(`Example app listening at http://localhost:3001`)
})
