'use strict'

let Joi = require('joi')
let should = require('chai').should()
let validator = require('./schema-validator')
const schema = Joi.object().keys({
  username: Joi.string().email().required()
})

describe('schema-validator',() => {
  it('should be a function', () => {
    validator.should.be.a('function')
  })
})

describe('validator', () => {

  let validate, ctx = {}

  beforeEach(() => {
    validate = validator(schema)
    ctx = {
      request: {
        body: {username: 'is not a email'}
      }
    }
  })

  it('should validate wrong input body with `Invalid input` body error text', done => {
    validate(ctx)
      .then(() => {
        ctx.body.info.should.equal('Invalid input')
        done()
      })
  })

  it('should validate wrong input with `400` status', done => {
    validate(ctx)
      .then(() => {
        ctx.status.should.equal(400)
        done()
      })
  })

  it('should validate wrong input with reason object', done => {
    validate(ctx)
      .then(() => {
        ctx.body.details.isJoi.should.be.true
        ctx.body.details.name.should.equal('ValidationError')
        ctx.body.details.details.should.lengthOf(1)
        done()
      })
  })

  it('should validate correct input calling next middleware', done => {
    ctx.request.body.username = 'fran.fhb@gmail.com'
    let index = 0
    let nextMiddleware = () => index++
    validate(ctx, nextMiddleware)
      .then(() => {
        should.not.exist(ctx.status)
        index.should.equal(1)
        done()
      })
  })
})
