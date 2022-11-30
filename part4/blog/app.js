const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const config = require('./util/config')
const bodyParser = require('body-parser')
const blogRouter = require('./controllers/blogController')
const middleware = require('./util/middleware')
const logger = require('./util/logger')
const mongoose = require('mongoose')

const mongoUrl = config.MONGO_URL
const mongoUser = config.MONGO_USERNAME
const mongoPassword = config.MONGO_PASSWORD

const mongoUrlWithCredentials = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoUrl}/?retryWrites=true&w=majority`

logger.info('connecting to', mongoUrl)

mongoose.connect(mongoUrlWithCredentials, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app