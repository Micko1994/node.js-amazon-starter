const utils = require('../../utils')
const { SuccessHandlerUtil, ErrorsUtil } = utils
const { ConflictError } = ErrorsUtil
const S3Lib = require('../../lib/s3')
const { THUMBNAIL } = require('../../config/config')

module.exports = {
  uploadFiles: (req, res, next) => {
    const { files } = req
    const { dimension = THUMBNAIL.DEFAULT_DIMENSION } = req.body

    if (!files) {
      throw new ConflictError('File Not Uploaded')
    }

    return S3Lib.uploadFileList(files, dimension)
      .then(result => SuccessHandlerUtil.handleAdd(res, result))
      .catch(next)
  }
}
