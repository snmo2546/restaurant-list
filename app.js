// include packages and define server related variables
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')

const app = express()
const port = 3000

// connect to MongoDB
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongo error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// set static files
app.use(express.static('public'))

// process URL with body-parser, method-override and express router
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

// start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})