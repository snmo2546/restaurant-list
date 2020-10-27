// include Express, Express router and restaurant model
const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// set routes
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .then(restaurants => {
      return restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(keyword.toLowerCase())
        || restaurant.name_en.toLowerCase().includes(keyword.toLowerCase())
        || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      )
    })
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.log(error))
})

// export module
module.exports = router