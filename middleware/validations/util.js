const Joi = require('joi')
const Validations = require('../../config/validations')
const { ConflictError } = require('../../utils/errors.util')

const joiValidation = (optionsCb, validations) => (req, res, next) => {
  const { error } = Joi
    .object(typeof validations === 'function' ? validations(req) : validations)
    .validate(
      optionsCb(req),
      Validations.DEFAULT_OPTIONS
    )
  if (error) {
    const _message = (error && error.details && error.details[0] && error.details[0].message) || 'Something went wrong'
    const message = _message.indexOf('| ') !== -1 ? _message.slice(_message.indexOf('| ') + 2) : _message
    return next(new ConflictError(message))
  }

  return next()
}

module.exports = {
  joiValidation
}
