// include Express, Express router and restaurant model
const express = require('express')
const router = express.Router()

// include home and restaurants module
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const users = require('./modules/users')

// set routes
router.use('/restaurants', restaurants)
router.use('/search', search)
router.use('/users', users)
router.use('/', home)

// export module
module.exports = router