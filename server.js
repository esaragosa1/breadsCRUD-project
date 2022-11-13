// DEPENDENCIES
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')


// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
  () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// MIDDLEWARE
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())


// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an Awesome App about Breads!')
})

// Breads
const breadController = require('./controllers/breads_controller.js')
app.use('/breads', breadController)

// 404 Page
app.get('*', (req, res) => {
    res.send('404')
  })

// LISTEN
app.listen(PORT, () => {
  console.log('listening on port', PORT);
})