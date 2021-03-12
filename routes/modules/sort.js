const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/:keyname/:sequence', (req, res) => {
  const keyname = req.params.keyname
  const sequence = req.params.sequence
  const keynameObj = { id: '_id', name: 'name', category: 'category', rating: 'rating' }
  const clientSelected = `${keynameObj[keyname]}`
  Restaurant.find()
    .lean()
    .sort({ [clientSelected]: sequence })
    .then(restaurants => res.render('index', { restaurants, keyname, sequence }))
    .catch(error => console.log(error))
})


module.exports = router