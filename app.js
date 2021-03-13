// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT

// set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// set session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// setting static files
app.use(express.static('public'))
// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))
// setting method-override
app.use(methodOverride('_method'))

// use passport.js
const usePassport = require('./config/passport')
usePassport(app)

// use connect-flash
app.use(flash())

// 驗證使用者是否在登入狀態
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

// start and listen on the Express sever
app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})