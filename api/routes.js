'use strict'

let Router = require('koa-router')
let body = require('koa-body')()
let validator = require('./middleware/schema-validator')

let todo = require('./todo/')

let {TodoJoi} = require('./models/todo')

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
