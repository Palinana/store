const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Product = db.model('product');

const testProduct = { 
    name: 'Field Lounge Chair', price: 1499.99, quantity: 10, 
    description: 'Shapely curves, a gentle recline and adjust-right cushions invite the lost art of unwinding. A sculptural powder-coated steel base sets up the striking profile. Steel and bent plywood construction with light all-over padding, Reversible seat and back cushions filled with high resiliency foam with feather-down wrap, High resiliency foam cushions with feather down wrap provide a mix of firm support and comfort, and with use will take on a more casual appearance over time, Feather-down filled lumbar pillow included.',  
    width: 34.50, height: 30.50,
    color: 'Red', image: '/images/FieldLoungeChair.jpg '
}

describe('/api/products', () => {
    describe('GET /api/products', () => {
        before(() => {
            return Product.create({
            name: testProduct.name,
            price: testProduct.price,
            description: testProduct.description,
            quantity: testProduct.quantity,
            width: testProduct.width,
            height: testProduct.height,
            color: testProduct.color,
            image: testProduct.image
            })
        })

        it('gets all products', () => {
            return request(app)
            .get('/api/products')
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array')
            })
        })

        it('gets an individual product by id', () => {
            return request(app)
            .get('/api/products/1')
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('object')
                expect(res.body.name).to.be.equal(testProduct.name)
            })
        })
    })

    describe('POST /api/products', () => { 
        const testProduct_2 = {
            name: 'Unique Chair',
            image: '/images/FieldLoungeChair.jpg',
            price: 700,
            description: 'Good chair!',
            color: 'Black',
            width: 29,
            height: 30,
            quantity: 5
        }

        it('creates a new product', () => { 
            return request(app)
            .post('/api/products')
            .send(testProduct_2)
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('object')
                expect(res.body.name).to.equal(testProduct_2.name);
                expect(res.body.description).to.equal(testProduct_2.description);
            })
        })
    })        
})
