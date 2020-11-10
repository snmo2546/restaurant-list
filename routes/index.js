// include Express, Express router and restaurant model
const express = require('express')
const router = express.Router()

// include home, restaurants, search and users module
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const users = require('./modules/users')

// include authenticator middleware
const { authenticator } = require('../middleware/auth')

// set routes
router.use('/restaurants', authenticator, restaurants)
router.use('/search', authenticator, search)
router.use('/users', users)
router.use('/', authenticator, home)

// export module
module.exports = router