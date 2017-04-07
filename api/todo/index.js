'use strict'

const todoRepository = require('./repository')

exports.list = async (ctx) => {
  try {
    ctx.status = 200
    ctx.body = await todoRepository.getTodoList()
  } catch (error) {
    ctx.status = 500
    ctx.body = { success: false, info: error.message }
  }
}

exports.get = async (ctx) => {
  try {
    ctx.status = 200
    ctx.body = await todoRepository.getTodo({_id: ctx.params.id})
  } catch (error) {
    ctx.status = 500
    ctx.body = { success: false, info: error.message }
  }
}

exports.post = async (ctx) => {
  try {
    ctx.status = 201
    ctx.body = { success: true, info: await todoRepository.saveTodo(ctx.request.body) }
  } catch (error) {
    ctx.status = error.status || 500
    ctx.body = { success: false, info: error.message }
  }
}

exports.put = async (ctx) => {
  try {
    let todo = await todoRepository.getTodo({_id: ctx.params.id})
    await todoRepository.updateTodo(todo._id, ctx.request.body)
    ctx.status = 200
    ctx.body = { success: true }
  } catch (error) {
    ctx.status = 500
    ctx.body = { success: false, info: error.message }
  }
}

exports.delete = async (ctx) => {
  try {
    let todo = await todoRepository.getTodo({_id: ctx.params.id})
    await todoRepository.removeTodo({_id: todo._id})
    ctx.status = 200
    ctx.body = { success: true }
  } catch (error) {
    ctx.status = 500
    ctx.body = { success: false, info: error.message }
  }
}
