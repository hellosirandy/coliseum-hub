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

    if (fileName.startsWith('smallthumb_')) {
      console.log('Already a Smallthumbnail.')
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
      console.log('Image downloaded locally to ', tempFilePath)
      if (fileName.startsWith('bigthumb_')) {
        return spawn('convert', [tempFilePath, '-thumbnail', '200x200>', tempFilePath])
      } else {
        return spawn('convert', [tempFilePath, '-thumbnail', '600x600>', tempFilePath])
      }
    })
    .then(() => {
      let thumbnailFilePath = ''
      console.log(fileName)
      if (fileName.startsWith('bigthumb_')) {
        thumbnailFilePath = filePath.replace('bigthumb_', 'smallthumb_')
      } else {
        thumbnailFilePath = filePath.replace(/(\/)?([^\/]*)$/, '$1bigthumb_$2')
      }
      return bucket.upload(tempFilePath, {
        destination: thumbnailFilePath
      })
    })
  })
