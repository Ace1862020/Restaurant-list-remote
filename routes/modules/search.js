const express = require('express')
const router = express.Router()

const restaurantList = require('../../models/seeds/restaurants.json')

// Search function
router.get('/', (req, res) => {
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

module.exports = router