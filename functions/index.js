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

    const temp100FilePath = `/tmp/100${fileName}`
    const temp200FilePath = `/tmp/200${fileName}`
    const temp400FilePath = `/tmp/400${fileName}`
    const temp800FilePath = `/tmp/800${fileName}`

    if (fileName.startsWith('thumb')) {
      console.log('Already a thumbnail.')
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
      return spawn('convert', [tempFilePath, '-thumbnail', '800>', temp800FilePath])
    })
    .then(() => {
      console.log("800 thumbnail generated")
      return spawn('convert', [temp800FilePath, '-thumbnail', '400>', temp400FilePath])
    })
    .then(() => {
      console.log("400 thumbnail generated")
      return spawn('convert', [temp400FilePath, '-thumbnail', '200>', temp200FilePath])
    })
    .then(() => {
      console.log("200 thumbnail generated")
      return spawn('convert', [temp200FilePath, '-thumbnail', '100>', temp100FilePath])
    })
    .then(() => {
      console.log("100 thumbnail generated")
      const thumbnailFilePath = filePath.replace(/(\/)?([^\/]*)$/, '$1thumb100_$2')
      return bucket.upload(temp100FilePath, {
        destination: thumbnailFilePath
      })
    })
    .then(() => {
      const thumbnailFilePath = filePath.replace(/(\/)?([^\/]*)$/, '$1thumb200_$2')
      return bucket.upload(temp200FilePath, {
        destination: thumbnailFilePath
      })
    })
    .then(() => {
      const thumbnailFilePath = filePath.replace(/(\/)?([^\/]*)$/, '$1thumb400_$2')
      return bucket.upload(temp400FilePath, {
        destination: thumbnailFilePath
      })
    })
    .then(() => {
      const thumbnailFilePath = filePath.replace(/(\/)?([^\/]*)$/, '$1thumb800_$2')
      return bucket.upload(temp800FilePath, {
        destination: thumbnailFilePath
      })
    })
  })
