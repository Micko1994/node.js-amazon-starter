const createError = require('http-errors')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const logger = require('morgan')

const api = require('./routes')
const { ErrorHandlerMiddleware } = require('./middleware')

const app = express()

app.use(express.json({ extended: false, limit: '50mb' }))
app.use(express.urlencoded({ extended: false, limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
app.use(bodyParser.json({ extended: false, limit: '50mb' }))

app.use(logger('dev'))
app.use('/public', express.static(path.join(__dirname, './public')))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, OPTIONS, DELETE')
  next()
})

/**
 * Initialize APIs.
 */
app.use('/api/v1', api)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

/**
 * @description Error handler (middleware).
 */
app.use(ErrorHandlerMiddleware.handleError)

module.exports = app
