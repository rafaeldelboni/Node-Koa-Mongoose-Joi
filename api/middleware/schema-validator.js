'use strict'

const Joi = require('joi')

module.exports = schema => async (ctx, next) => {
  let {error} = Joi.validate(ctx.request.body, schema)
  if (error) {
    ctx.status = 400
    ctx.body = {
      success: false,
      info: 'Invalid input',
      details: error
    }
    return
  }
  return next()
}
