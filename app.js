// require packages used in the project
const express = require('express')
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Resran = require('./models/restaurant')
const restaurantList = require('./restaurants.json').results

const app = express()

// Establish connection with mongoDB
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  // Get all the Resran data
  Resran.find()
    .lean()
    .then(resrans => res.render('index', { resrans }))
    .catch(error => console.error(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.get('/:rest_id', (req, res) => {
  const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.rest_id)
  res.render('show', { restaurant: restaurant })
})

// start and listen on the Express sever
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})