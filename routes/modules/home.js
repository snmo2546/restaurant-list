// include Express, Express router and restaurant model
const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// set routes
router.get('/', (req, res) => {
  const userId = req.user._id
  let sort = 'name'

  if (Object.keys(req.query).length !== 0) {
    sort = req.query.sort
  }

  Restaurant.find({ userId })
    .lean()
    .sort(sort)
    .then(restaurants => res.render('index', { restaurants, sort }))
    .catch(error => console.log(error))
})

// export module
module.exports = router