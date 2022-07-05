const os = require('os')
const multer = require('multer')

const { ErrorsUtil } = require('../utils')
const { MulterUnexpectedFieldError } = ErrorsUtil

/**
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @param {Function | RequestHandler} upload
   * @description Call upload request handler.
   */
const _upload = (req, res, next, upload) => {
  upload(req, res, (error) => {
    if (error) {
      const _error = error.name === 'Error'
        ? new MulterUnexpectedFieldError(`${error.message} "${error.field}"`)
        : error

      return next(_error)
    }

    return next()
  })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, os.tmpdir())
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

/**
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @description Middleware for uploading single file
   *  1. Calls multer middleware function
   *  2. If there is an error, passes it to the next() function wrapped as MulterUnexpectedFieldError.
   */
const uploadFilesMulter = (req, res, next) => {
  const upload = multer({
    storage: storage
  }).array('file', 100)

  _upload(req, res, next, upload)
}

module.exports = {
  uploadFilesMulter
}
