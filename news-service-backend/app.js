const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
var corsOptions = {
  origin: 'http://localhost:3000'
}
app.use(cors(corsOptions))

app.use(express.static('build'))
app.use(express.json())
// const morgan = require('morgan')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const usersRouter = require('./controllers/users')

app.use(middleware.tokenExtractor)

app.use('/api/users', usersRouter)

var MONGODB_URI = config.MONGODB_URI


logger.info('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app

