const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Category = db.model('category');

describe('Category routes', () => {
    beforeEach(() => {
      return db.sync({force: true})
    })
  
    describe('/api/categories/', () => {
      const categoryName = 'Chairs'
  
      beforeEach(() => {
        return Category.create({
            name: categoryName
        })
      })
  
      it('GET /api/categories', () => {
        return request(app)
          .get('/api/categories')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body[0].name).to.be.equal(categoryName)
          })
      })
    })
}) 