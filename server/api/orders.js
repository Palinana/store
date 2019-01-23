const router = require('express').Router()
const { Order } = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll({
    include: [{ all: true }],
    order: ['id']
  })
    .then(orders => res.json(orders))
    .catch(next)
})

router.post('/', (req, res, next) => {
  // user must be logged in

  if (!req.user) {
    return res.sendStatus(403);
  }

  // order's user id must match logged in user
  if (req.body.userId !== req.user.id) {
    return res.sendStatus(403);
  }

  Order.create(req.body)
    .then(order => res.status(201).json(order))
    .catch(next)
})