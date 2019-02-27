const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');

describe('User routes', () => {
    beforeEach(() => {
      return db.sync({force: true})
    })
  
    describe('/api/users/', () => {
      const poppysEmail = 'poppyharlow@gmail.com'
  
      beforeEach(() => {
        return User.create({
          email: poppysEmail
        })
      })
  
      it('GET /api/users', () => {
        return request(app)
          .get('/api/users')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body[0].email).to.be.equal(poppysEmail)
          })
      })
    })
}) 