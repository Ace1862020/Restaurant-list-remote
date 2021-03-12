// require packages used in the project
const express = require('express')
const port = 3000
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')

const app = express()

// set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// set session
app.use(session({
  secret: 'ThisRestaurantSecret',
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

// 驗證使用者是否在登入狀態
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)

// start and listen on the Express sever
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})