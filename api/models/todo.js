'use strict'

let Joi = require('joi')
let Mongoose = require('mongoose')
let Joigoose = require('joigoose')(Mongoose)

let TodoJoi = Joi.object().keys({
  description: Joi.string().required(),
  done: Joi.boolean().required(),
  updated: Joi.date()
})

let mongooseTodoSchema = Joigoose.convert(TodoJoi)
Mongoose.model('Todo', mongooseTodoSchema)

module.exports = { 
  TodoJoi,
  TodoDb: Mongoose.model('Todo')
}