'use strict'

const koa = require('koa')
const logger = require('koa-logger')

const database = require('./database')
database.configure()

const routeConfig = require('./routes')
const app = new koa()

app.use(logger())

routeConfig(app)

module.exports = app
