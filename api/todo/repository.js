'use strict'

let {TodoDb} = require('../models/todo')

let getTodoList = function () {
  return TodoDb.find()
}

let getTodo = function (parameter) {
  return new Promise(function (resolve, reject) {
    TodoDb.findOne(parameter)
      .then(resultTodo => {
        if (!resultTodo)
          reject('todo not found')
        resolve(resultTodo)
      })
    .catch(error => {
      reject(error)
    })
  })
}

let saveTodo = function (todo) {
  return TodoDb(Object.assign(todo)).save()
}

let updateTodo = function (id, todo) {
  return new Promise(function (resolve, reject) {
    TodoDb.findByIdAndUpdate(id, todo)
      .then(resultTodo => {
        if (!resultTodo)
          reject('todo not found')
        resolve(resultTodo)
      })
      .catch(error => {
        reject(error)
      })
  })
}

let removeTodo = function (parameter) {
  return TodoDb.remove(parameter)
}

module.exports = {
  getTodoList: getTodoList,
  getTodo: getTodo,
  saveTodo: saveTodo,
  updateTodo: updateTodo,
  removeTodo: removeTodo
}
