// 總路由
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const search = require('./modules/search')
const resrans = require('./modules/resrans')

router.use('/', home)
router.use('/search', search)
router.use('/resrans', resrans)

module.exports = router