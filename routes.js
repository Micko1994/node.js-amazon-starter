const app = require('express')()

const files = require('./routes/files.api')

/**
 * Initialize APIs having public endpoints.
 */
app.use('/files', files)

module.exports = app
