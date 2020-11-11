const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')
const SEED_RESTAURANT = require('../data/restaurant.json').results

const SEED_USERS = [
  {
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  SEED_USERS.forEach(user => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        name: user.name,
        email: user.email,
        password: hash
      }))
      .then(newUser => {
        SEED_RESTAURANT.map((restaurant, index) => {
          restaurant.userId = newUser._id
          if (index < 3 && newUser.email === 'user1@example.com') {
            return Restaurant.create(restaurant)
          }
          if (3 <= index && index < 6 && newUser.email === 'user2@example.com') {
            return Restaurant.create(restaurant)
          }
        })
      })
      .then(() => {
        console.log('done.')
      })
  })
})