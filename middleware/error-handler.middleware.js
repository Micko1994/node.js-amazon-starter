const ERROR_CASES = {
  NotFoundError: {
    statusCode: 404,
    errorCode: 'Not Found'
  },
  UnauthorizedError: {
    statusCode: 401,
    errorCode: 'Unauthorized'
  },
  ConflictError: {
    statusCode: 409,
    errorCode: 'Conflict'
  },
  BadRequestError: {
    statusCode: 400,
    errorCode: 'Bad Request'
  },
  ValidationError: {
    statusCode: 400,
    errorCode: 'Bad Request'
  },
  DEFAULT: {
    statusCode: 500,
    errorCode: 'InternalError',
    errorMessage: 'The server encountered an internal error. Try again later.'
  }
}

/**
 * @access public
 * @returns {function(*, *, *, *)}
 * @description Error handler.
 */
const handleError = (err, req, res, next) => {
  const ERROR_CASE = ERROR_CASES[err.name] || ERROR_CASES.DEFAULT

  console.log('ERROR: ', err)
  // if error get from sequelize check error message as err.errors && err.errors[0] && err.errors[0].message
  const errorResponse = {
    status: ERROR_CASE.statusCode,
    code: ERROR_CASE.errorCode,
    message: ERROR_CASE.errorMessage || (err.errors && err.errors[0] && err.errors[0].message) || err.message
  }

  // temp. log to explore and add more cases.
  errorResponse.status === 500 && console.log('Case: ', err.status, err.statusCode, err.code, err.name, err.message)

  return res.status(errorResponse.status).json(errorResponse)
}

module.exports = {
  handleError
}
