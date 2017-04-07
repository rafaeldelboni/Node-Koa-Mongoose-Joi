'use strict'

const app = require('../app')
const request = require('supertest').agent(app.listen())
require('chai').should()

const repository = require('./repository')

describe('Todos', function() {

  describe('GET /todo', function() {

    before(function(done) {
      let todo1 = repository.saveTodo({
        'description': 'Task:101',
        'done': false
      })

      let todo2 = repository.saveTodo({
        'description': 'Task:202',
        'done': true
      })

      Promise.all([todo1, todo2]).then( () => {
        return done()
      })
    })

    after(function(done) {
      let todo1 = repository.removeTodo({
        'description': 'Task:101'
      })

      let todo2 = repository.removeTodo({
        'description': 'Task:202'
      })

      Promise.all([todo1, todo2]).then( () => {
        return done()
      })
    })

    it('should get a list with test todos', function(done) {
      request
      .get('/todo')
      .expect(200, function(err, res) {
        if (err) return done(err)
        let responseJson = JSON.parse(res.text)
        responseJson.length.should.be.equal(2)
        return done()
      })
    })

    it('should get one test todo', function(done) {
      repository.getTodo({'description': 'Task:202'})
        .then( todo =>{
          request
          .get('/todo/' + todo._id)
          .expect(200, function(err, res) {
            if (err) return done(err)
            let responseJson = JSON.parse(res.text)
            responseJson.description.should.be.equal('Task:202')
            responseJson.done.should.be.equal(true)
            return done()
          })
        })
    })

  })

  describe('POST /todo', function() {

    after(function(done) {
      repository.removeTodo({}).then( () => {
        return done()
      })
    })

    it('should add one todo on db', function(done) {
      request
      .post('/todo')
      .send({'description': 'Task:303','done': false})
      .expect(201, function(err, res) {
        if (err) return done(err)
        let responseJson = JSON.parse(res.text)
        responseJson.success.should.be.equal(true)
        responseJson.info._id.should.not.be.empty
        responseJson.info.description.should.be.equal('Task:303')
        return done()
      })
    })

    it('should not add a todo on db without field done', function(done) {
      request
        .post('/todo/')
        .send({'description': 'Task:404'})
        .expect(400, function(err, res) {
          if (err) return done(err)
          let responseJson = JSON.parse(res.text)
          responseJson.success.should.be.equal(false)
          responseJson.info.should.be.equal('Invalid input')
          return done()
        })
    })

  })

  describe('PUT /todo', function() {

    before(function(done) {
      let todo1 = repository.saveTodo({
        'description': 'Task:101',
        'done': false
      })

      let todo2 = repository.saveTodo({
        'description': 'Task:202',
        'done': true
      })

      Promise.all([todo1, todo2]).then( () => {
        return done()
      })
    })

    after(function(done) {
      repository.removeTodo({}).then( () => {
        return done()
      })
    })

    it('should update a todo on db', function(done) {
      repository.getTodo({'description': 'Task:101'})
        .then(todo =>{
          request
            .put('/todo/' + todo._id)
            .send({'description': 'Task:303','done': true})
            .expect(200, function(err, res) {
              if (err) return done(err)
              let responseJson = JSON.parse(res.text)
              responseJson.success.should.be.equal(true)
              repository.getTodo({'_id': todo._id})
                .then(updatedTodo => {
                  updatedTodo.description.should.be.equal('Task:303')
                  updatedTodo.done.should.be.equal(true)
                  return done()
                })
            })
        })
    })

    it('should not update a todo on db without field done', function(done) {
      repository.getTodo({'description': 'Task:202'})
        .then(todo =>{
          request
            .put('/todo/' + todo._id)
            .send({'description': 'Task:404'})
            .expect(400, function(err, res) {
              if (err) return done(err)
              let responseJson = JSON.parse(res.text)
              responseJson.success.should.be.equal(false)
              responseJson.info.should.be.equal('Invalid input')
              return done()
            })
        })
    })

    it('should not update a non existing todo on db', function(done) {
      request
        .put('/todo/NONEXISTENTID')
        .send({'description': 'Task:303','done': true})
        .expect(500, function(err, res) {
          if (err) return done(err)
          let responseJson = JSON.parse(res.text)
          responseJson.success.should.be.equal(false)
          responseJson.info.should.be.equal('Cast to ObjectId failed for value "NONEXISTENTID" at path "_id" for model "Todo"')
          return done()
        })
    })

  })

  describe('DELETE /todo', function() {

    before(function(done) {
      repository.saveTodo({
        'description': 'Task:Delete',
        'done': true
      }).then(done())
    })

    it('should delete a todo on db', function(done) {
      repository.getTodo({'description': 'Task:Delete'})
        .then(todo =>{
          request
            .delete('/todo/' + todo._id)
            .expect(200, function(err, res) {
              if (err) return done(err)
              let responseJson = JSON.parse(res.text)
              responseJson.success.should.be.equal(true)
              repository.getTodo({'_id': todo._id})
                .catch(error => {
                  error.message.should.be.equal('todo not found')
                  return done()
                })
            })
        })
    })

    it('should not delete a non existing todo on db', function(done) {
      request
        .delete('/todo/NONEXISTENTID')
        .expect(500, function(err, res) {
          if (err) return done(err)
          let responseJson = JSON.parse(res.text)
          responseJson.success.should.be.equal(false)
          responseJson.info.should.be.equal('Cast to ObjectId failed for value "NONEXISTENTID" at path "_id" for model "Todo"')
          return done()
        })
    })

  })

})
