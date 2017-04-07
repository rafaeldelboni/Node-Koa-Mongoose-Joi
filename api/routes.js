'use strict'

const Router = require('koa-router')
const body = require('koa-body')()
const validator = require('./middleware/schema-validator')

const todo = require('./todo/')

const {TodoJoi} = require('./models/todo')

let todoRoute = new Router({prefix: '/todo'})
todoRoute.get('/', todo.list)
      .get('/:id', todo.get)
      .post('/', body, validator(TodoJoi), todo.post)
      .put('/:id', body, validator(TodoJoi), todo.put)
      .del('/:id', todo.delete)

module.exports = app => {
  app.use(todoRoute.routes())
  app.use(todoRoute.allowedMethods())
}
