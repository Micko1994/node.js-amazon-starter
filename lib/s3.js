const AWS_SDK = require('aws-sdk')
const Promise = require('bluebird')
const pathExtra = require('path-extra')
const sharp = require('sharp')

const config = require('../config/config')
const { FileManagerUtil } = require('../utils')
const { AWS } = config
const {
  ACCESS_KEY_ID,
  FILE_BUCKET_REGION,
  SECRET_ACCESS_KEY,
  FILE_PUBLIC_BUCKET_UPLOADS,
  DEFAULT_PATH_PREFIX
} = AWS

AWS_SDK.config.setPromisesDependency(Promise)

const s3Bucket = new AWS_SDK.S3({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: FILE_BUCKET_REGION
})

/**
 * @private
 * @param {Object} file
 * @returns {Promise.<>}
 * @description Create image thumbnail.
 */
const _createThumbnail = (file, dimension) => {
  const thumbPath = pathExtra.fileNameWithPrefix(file.path, 'thumb_')

  return sharp(file.path)
    .resize({
      width: dimension.width,
      height: dimension.height
    })
    .toFile(thumbPath)
    .then((result) => {
      return result
        ? {
          ...file,
          path: thumbPath
        }
        : {}
    })
}

/**
   * @param {Object} payload
   * @param {Object} payload.fileStream
   * @param {string} payload.fileMime
   * @param {string} payload.distFilePath
   * @param {string} payload.bucketName
   * @returns {Promise<Object>}
   * @description Upload single file to S3.
   */
const uploadFileToS3 = (payload) => {
  const { fileStream, fileMime, distFilePath, bucketName, ContentEncoding } = payload
  const params = {
    Bucket: bucketName,
    Key: distFilePath,
    Body: fileStream,
    ContentType: distFilePath.endsWith('.svg') ? 'image/svg+xml' : fileMime,
    CacheControl: 'public,max-age=31536000'
  }

  if (ContentEncoding) {
    params.ContentEncoding = ContentEncoding
  }

  return s3Bucket.upload(params).promise()
}

/**
 * @private
 * @param {Object} file
 * @param {Object} currentFolder
 * @returns {Promise.<>}
 * @description Upload media file.
 */
async function _uploadSingleFile (file, dimension) {
  const thumbnail = await _createThumbnail(file, dimension)

  const payload = FileManagerUtil.generateS3FileUploadPayload(DEFAULT_PATH_PREFIX, FILE_PUBLIC_BUCKET_UPLOADS, thumbnail)

  return uploadFileToS3(payload)
}

/**
 * @public
 * @param {Array} fileList
 * @param {Object} dimension
 * @returns {Promise.<>}
 * @description Upload files one by one.
 */
function uploadFileList (files, dimension) {
  return Promise.map(files, (item) => {
    return _uploadSingleFile(item, dimension)
  })
}

module.exports = {
  uploadFileToS3,
  uploadFileList
}
