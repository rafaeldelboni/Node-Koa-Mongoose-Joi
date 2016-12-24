let todoRepository = require('./repository')

exports.list = function (ctx) {
  return todoRepository.getTodoList()
  .then (todo => {
    ctx.status = 200
    ctx.body = JSON.stringify(todo)
  })
  .catch (error => {
    ctx.status = 500
    ctx.body = { success: false, info: error.message }
  })
}

exports.get = function (ctx) {
  return todoRepository.getTodo({_id: ctx.params.id})
  .then (todo => {
    ctx.status = 200
    ctx.body = todo
  })
  .catch (error => {
    ctx.status = 500
    ctx.body = { success: false, info: error.message }
  })
}

exports.post = function (ctx) {
  return todoRepository.saveTodo(ctx.request.body)
  .then (todo => {
    ctx.status = 201
    ctx.body = { success: true, info: todo }
  })
  .catch (error => {
    ctx.status = error.status || 500
    ctx.body = { success: false, info: error.message }
  })
}

exports.put = function (ctx) {
  return todoRepository.getTodo({_id: ctx.params.id})
  .then (() => {
    return todoRepository.updateTodo(ctx.params.id, ctx.request.body)
    .then(() => {
      ctx.status = 200
      ctx.body = { success: true }
    }) 
  })
  .catch (error => {
    ctx.status = 500
    ctx.body = { success: false, info: error.message }
  })
}

exports.delete = function (ctx) {
  return todoRepository.removeTodo({_id: ctx.params.id})
  .then (() => {
    ctx.status = 200
    ctx.body = { success: true }
  })
  .catch (error => {
    ctx.status = 500
    ctx.body = { success: false, info: error.message }
  })
}