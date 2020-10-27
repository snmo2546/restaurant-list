// include Express, Express router and restaurant model
const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// set routes
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// export module
module.exports = router