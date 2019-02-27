const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Order = db.model('order');

const testOrder = { 
    confirmationCode: 36179.95,
    cart: [{"productId":5,"quantity":1,"price":"979.99"},{"productId":6,"quantity":4,"price":"1299.99"}],
    total: 6179.95,
    status: 'COMPLETE'
}

describe('Order routes', () => {
  
    describe('/api/orders', () => {
        const categoryName = 'Chairs'
    
        before(() => {
            return Order.create({
                confirmationCode: testOrder.confirmationCode,
                cart: testOrder.cart,
                total: testOrder.description,
                status: testOrder.status
            })
        })
  
      it('GET /api/orders', () => {
        return request(app)
          .get('/api/orders')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body[0].confirmationCode).to.be.equal(String(testOrder.confirmationCode))
          })
      })
    })
}) 