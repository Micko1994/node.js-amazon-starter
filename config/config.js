const defaultDimensions = {
  large: {
    width: 2048,
    height: 2048
  },
  medium: {
    width: 1024,
    height: 1024
  },
  thumb: {
    width: 300,
    height: 300
  }
}

module.exports = {
  THUMBNAIL: {
    MIME_TYPES: process.env.THUMBNAIL_DEFAULT_MIME_TYPES || ['image/jpeg', 'image/jpg', 'image/png'],
    DIMENSIONS: process.env.THUMBNAIL_DIMENSIONS || defaultDimensions,
    DEFAULT_DIMENSION: process.env.THUMBNAIL_DEFAULT_DIMENSION || defaultDimensions.medium
  },
  AWS: {
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || 'rnrnrnr',
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || 'rhrth/rhrthrh/rthrthrthrthrthrthr',
    FILE_BUCKET_REGION: process.env.AWS_FILE_BUCKET_REGION || 'us-east-2',
    FILE_PUBLIC_BUCKET: process.env.AWS_FILE_PUBLIC_BUCKET || 'images-task',
    FILE_PUBLIC_BUCKET_UPLOADS: process.env.AWS_FILE_PUBLIC_BUCKET_UPLOADS || 'images-task.uploads',
    DEFAULT_PATH_PREFIX: process.env.AWS_DEFAULT_PATH_PREFIX || 'default'
  }
}
