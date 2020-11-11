// include packages and define server related variables
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')

const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const port = process.env.PORT

// register express-handlebars helper
const hbs = exphbs.create({
  defaultlayout: 'main',
  helpers: {
    equals: function (value1, value2) { return (value1 === value2) }
  }
})

// set template engine
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

// set static files
app.use(express.static('public'))

// process URL with body-parser, method-override and express router
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

// start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})