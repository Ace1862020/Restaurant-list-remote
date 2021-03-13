// 總路由
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const search = require('./modules/search')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const sort = require('./modules/sort')
const auth = require('./modules/auth')

// 掛載 auth middleware
const { authenticator } = require('../middleware/auth')

// 在需要驗證後才能使用的路由裡，加入authenticator驗證程序

router.use('/search', authenticator, search)
router.use('/restaurants', authenticator, restaurants)
router.use('/sort', authenticator, sort)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router