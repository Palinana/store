const router = require('express').Router()
const { Product } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
  .then(product => res.send(product))
  .catch(next)
})

router.post('/', (req, res, next) => {
  //creates and saves trip to database
  Product.create(req.body)
  //sends created status
  .then(product => res.send(product))
  .catch(next)
})
