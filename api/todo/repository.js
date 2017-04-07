'use strict'

const {TodoDb} = require('../models/todo')

exports.getTodoList = async () => TodoDb.find()

exports.getTodo = async (id) => {
  let resultTodo = await TodoDb.findOne(id)
  if (!resultTodo)
    throw {message: 'todo not found'}
  return resultTodo
}

exports.saveTodo = async (todo) => {
  return TodoDb(todo).save()
}

exports.updateTodo = async (id, todo) => {
  let resultTodo = await TodoDb.findByIdAndUpdate(id, todo)
  if (!resultTodo)
    throw {message: 'todo not found'}
  return resultTodo
}

exports.removeTodo = async (id) => TodoDb.remove(id)
