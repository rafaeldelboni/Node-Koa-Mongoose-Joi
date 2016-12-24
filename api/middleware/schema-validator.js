'use strict'

const Joi = require('joi')

module.exports = schema => (ctx, next) => {
  return new Promise(fulfill => {
    let {error} = Joi.validate(ctx.request.body, schema)
    if (error) {
      ctx.status = 400
      ctx.body = {
        success: false,  
        info: 'Invalid input',
        details: error
      }
      fulfill()
      return
    }
    fulfill(next())
  })
}
