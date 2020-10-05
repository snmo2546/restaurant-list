// include express from node_modules
const express = require('express')
const app = express()
const restaurantList = require('./restaurant.json')

// define server related variables
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  res.render('show')
})

// start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})