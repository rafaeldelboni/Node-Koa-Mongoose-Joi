'use strict'

let fs = require('fs')
let mongoose = require('mongoose')
const config = require('config')

module.exports = exports = {}

exports.configure = function configure() {
  mongoose.Promise = global.Promise
  let uri = config.get('mongodb.uri')
  mongoose.connect(uri)
  setupMongooseSchemas()
}

function setupMongooseSchemas() {
  var models_path = `${__dirname}/models`
  fs.readdirSync(models_path).forEach(file => {
    require(`${models_path}/${file}`)
  })
}
