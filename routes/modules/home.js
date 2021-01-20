const express = require('express')
const router = express.Router()

const Resran = require('../../models/restaurant')

router.get('/', (req, res) => {
  Resran.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(resrans => res.render('index', { resrans }))
    .catch(error => console.error(error))
})

module.exports = router