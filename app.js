// require packages used in the project
const express = require('express')
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurants.json')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Resran = require('./models/restaurant')

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

// Search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

// routes setting
app.get('/', (req, res) => {
  // Get all the Resran data
  Resran.find()
    .lean()
    .then(resrans => res.render('index', { resrans }))
    .catch(error => console.error(error))
})

// Show Page
app.get('/restaurant/:_id', (req, res) => {
  const id = req.params._id
  return Resran.findById(id)
    .lean()
    .then(resran => res.render('show', { resran }))
    .catch(error => console.log(error))
})

// Create Page
app.get('/create', (req, res) => {
  return res.render('create')
})

app.post('/create/new', (req, res) => {
  const name = req.body.name
  return Resran.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//Edit Page
app.get('/restaurant/:_id/edit', (req, res) => {
  const id = req.params._id
  return Resran.findById(id)
    .lean()
    .then(resran => res.render('edit', { resran }))
    .catch(error => console.log(error))
})

app.post('/restaurant/:_id/edit', (req, res) => {
  const id = req.params._id
  console.log('body:', body)
  return Resran.findById(id)
    .then(resran => {
      resran.name = req.body.name
      resran.category = req.body.category
      resran.image = req.body.image
      resran.location = req.body.location
      resran.phone = req.body.phone
      resran.google_map = req.body.google_map
      resran.rating = req.body.rating
      resran.description = req.body.description
      return resran.save()
    })
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch(error => console.log(error))
})

// start and listen on the Express sever
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})