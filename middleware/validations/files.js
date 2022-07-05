const Joi = require('joi')
const util = require('./util')
const config = require('../../config/config')
const { THUMBNAIL } = config

const validateFilesBody = util.joiValidation(req => ({ body: req.body }),
  {
    files: Joi.array().items(
      Joi.object().keys({
        fieldname: Joi.string().valid('file').required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid(THUMBNAIL.MIME_TYPES.join(', ')).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().positive().required()
      })
    ).required(),
    body: {
      dimension: Joi.string().valid('large', 'medium', 'thumb')
    }
  })

module.exports = {
  validateFilesBody
}
