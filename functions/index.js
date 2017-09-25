const functions = require('firebase-functions')
const gcs = require('@google-cloud/storage')()
const spawn = require('child-process-promise').spawn

exports.generateThumbnail = functions.storage.object()
  .onChange(event => {
    const object = event.data
    const filePath = object.name
    const fileName = filePath.split('/').pop()
    const fileBucket = object.bucket
    const bucket = gcs.bucket(fileBucket)
    const tempFilePath = `/tmp/${fileName}`

    if (fileName.startsWith('thumb_')) {
      console.log('Already a Thumbnail.')
      return
    }

    if (!object.contentType.startsWith('image/')) {
      console.log('Not an image')
      return
    }

    if (object.resourceState === 'not_exists') {
      console.log('Deletion event')
      return
    }

    return bucket.file(filePath).download({
      destination: tempFilePath
    })
    .then(() => {
      console.log('Image downloadedlocally to ', tempFilePath)
      spawn('convert', [tempFilePath, '-thumbnail', '200x200', tempFilePath])
    })
    .then(() => {
      console.log('Thumbnail created')
      const thumbnailFilePath = filePath.replace(/(\/)?([^\/]*)$/, '$1thumb_$2')
      return bucket.upload(tempFilePath, {
        destination: thumbnailFilePath
      })
    })
  })
