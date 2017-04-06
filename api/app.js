'use strict'

let koa = require('koa')
let logger = require('koa-logger')

let database = require('./database')
database.configure()

const routeConfig = require('./routes')
const app = new koa()

app.use(logger())

routeConfig(app)

module.exports = app
