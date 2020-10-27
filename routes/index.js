// include Express, Express router and restaurant model
const express = require('express')
const router = express.Router()

// include home and restaurants module
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')

// set routes
router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/search', search)

// export module
module.exports = router