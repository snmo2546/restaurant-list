// include mongoose
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

// connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

// get connection status
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

//export module
module.exports = db