const express = require('express')
const router = express.Router()
const FilesService = require('./services/files.api.services')
const UploadMiddleware = require('../middleware/upload.middleware')
const FilesValidation = require('../middleware/validations/files')

router.post('/upload',
  FilesValidation.validateFilesBody,
  UploadMiddleware.uploadFilesMulter,
  FilesService.uploadFiles
)

module.exports = router
