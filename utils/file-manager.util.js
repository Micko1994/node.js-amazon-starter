const CryptoJS = require('crypto-js')
const fs = require('fs')
const path = require('path')

/**
   * @param {Object} payload
   * @param {string} payload.pathPrefix
   * @param {string} payload.originalName
   * @param {string} payload.encoding
   * @param {string} payload.mimeType
   * @param {number} payload.size
   * @return {string}
   * @description Generate destination file path by hashing passed parameters.
   */
const generateFileDestinationPath = (payload) => {
  const { pathPrefix, originalName, encoding, filePath, mimeType, size } = payload
  const fileExtension = mimeType.includes('svg') ? path.extname(filePath) : `.${mimeType.split('/')[1]}`
  const date = new Date()
  const stringToHash = `${originalName}${encoding}${mimeType}${size}${date}`
  const md5Hash = CryptoJS.MD5(stringToHash).toString()

  return `${pathPrefix}/${md5Hash}${fileExtension}`
}

/**
   * @param {string} pathPrefix
   * @param {string} bucketName
   * @param {Object} file
   * @param {string} file.originalname
   * @param {string} file.encoding
   * @param {string} file.mimetype
   * @param {string} file.path
   * @param {number} file.size
   * @return {Object}
   * @description Generate S3 upload payload for one file.
   */
const generateS3FileUploadPayload = (pathPrefix, bucketName, file) => {
  const { originalname, encoding, mimetype, path, size } = file

  return {
    fileStream: fs.createReadStream(path),
    fileMime: mimetype,
    distFilePath: generateFileDestinationPath({
      pathPrefix,
      originalName: originalname,
      encoding,
      mimeType: mimetype,
      size,
      filePath: path
    }),
    bucketName
  }
}

module.exports = {
  generateS3FileUploadPayload
}
