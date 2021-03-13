const mongoose = require('mongoose')

const db = mongoose.connection

// Establish connection with mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

db.on('error', () => { console.log('mongodb error!!') })
db.once('open', () => { console.log('mongodb connected!') })

module.exports = db