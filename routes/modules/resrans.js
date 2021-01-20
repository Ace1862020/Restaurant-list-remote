const express = require('express')
const router = express.Router()

const Resran = require('../../models/restaurant')

// Create Page
router.get('/new', (req, res) => {
  return res.render('create')
})

router.post('/', (req, res) => {
  const name = req.body.name
  return Resran.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Show Page
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Resran.findById(id)
    .lean()
    .then(resran => res.render('show', { resran }))
    .catch(error => console.log(error))
})

// Edit Pae
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Resran.findById(id)
    .lean()
    .then(resran => res.render('edit', { resran }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
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

// Delete function
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Resran.findById(id)
    .then(resran => resran.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router