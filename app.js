// require packages used in the project
const express = require('express')
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

const routes = require('./routes')

const app = express()

// Establish connection with mongoDB
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => { console.log('mongodb error!!') })
db.once('open', () => { console.log('mongodb connected!') })

// set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))
// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))
// setting method-override
app.use(methodOverride('_method'))

app.use(routes)

// start and listen on the Express sever
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})