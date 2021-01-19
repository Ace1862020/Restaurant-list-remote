// require packages used in the project
const express = require('express')
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurants.json')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
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
// setting method-override
app.use(methodOverride('_method'))

// Routes setting
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.category.includes(keyword) || restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  if (restaurants.length == 0) {
    res.render('notfound')
  } else {
    res.render('index', { resrans: restaurants, keyword: keyword })
  }
})

// Index Page
app.get('/', (req, res) => {
  // Get all the Resran data
  Resran.find()
    .lean()
    .then(resrans => res.render('index', { resrans }))
    .catch(error => console.error(error))
})

// Create Page
app.get('/resrans/new', (req, res) => {
  return res.render('create')
})

app.post('/resrans', (req, res) => {
  const name = req.body.name
  return Resran.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Show Page
app.get('/resrans/:id', (req, res) => {
  const id = req.params.id
  return Resran.findById(id)
    .lean()
    .then(resran => res.render('show', { resran }))
    .catch(error => console.log(error))
})

//Edit Page
app.get('/resrans/:_id/edit', (req, res) => {
  const id = req.params._id
  return Resran.findById(id)
    .lean()
    .then(resran => res.render('edit', { resran }))
    .catch(error => console.log(error))
})

app.put('/resrans/:id', (req, res) => {
  const id = req.params.id
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
    .then(() => res.redirect(`/resrans/${id}`))
    .catch(error => console.log(error))
})

// Delete
app.delete('/resrans/:id', (req, res) => {
  const id = req.params.id
  return Resran.findById(id)
    .then(resran => resran.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// start and listen on the Express sever
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})