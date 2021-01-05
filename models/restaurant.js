const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resranSchema = new Schema({
  name: {
    type: string,
    required: true
  },
  name_en: string,
  category: string,
  image: string,
  location: string,
  phone: string,
  google_map: string,
  rating: Number,
  description: string
})

module.exports = mongoose.model('Resran', resranSchema)