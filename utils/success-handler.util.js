const HTTP_CODE_CONSTANTS = {
  SUCCESS_200: { STATUS: 200, MESSAGE: 'OK' },
  SUCCESS_201: { STATUS: 201, MESSAGE: 'Created' },
  SUCCESS_204: { STATUS: 204, MESSAGE: 'No Content' }
}

/**
 * Sends json with given HTTP code constant.
   * @private
   * @param res
   * @param code
   * @param data
*/
const _sendResponse = (res, code, data) => {
  if (code.STATUS === 204) { return res.status(code.STATUS).json() }

  const response = {
    status: code.STATUS,
    message: code.MESSAGE
  }

  if (data) {
    response.data = data
  }

  return res.status(code.STATUS).json(response)
}

const SuccessHandler = {}

/**
 * Handle `get` method requests.
   * @access public
   * @param res
   * @param data
   */
SuccessHandler.handleGet = (res, data) => {
  _sendResponse(res, HTTP_CODE_CONSTANTS.SUCCESS_200, data)
}

/**
 * Handle `put, patch` method requests.
   * @access public
   * @param res
   * @param data
   */
SuccessHandler.handleUpdate = (res, data) => {
  _sendResponse(res, HTTP_CODE_CONSTANTS.SUCCESS_200, data)
}

/**
 * Handle `post` method requests.
   * @access public
   * @param res
   * @param data
   */
SuccessHandler.handleAdd = (res, data) => {
  _sendResponse(res, HTTP_CODE_CONSTANTS.SUCCESS_201, data)
}

/**
 * Handle `delete` method requests.
   * @access public
   * @param res
   * @param data
   */
SuccessHandler.handleDelete = (res, data) => {
  _sendResponse(res, HTTP_CODE_CONSTANTS.SUCCESS_200, data)
}

module.exports = SuccessHandler
