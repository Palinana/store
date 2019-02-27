const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email', 'isAdmin'],
    order: [['isAdmin', 'DESC'], 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  User.destroy({
    where: {
        id: req.params.id
    }
  })
  .then(rows => res.sendStatus(rows ? 204 : 404))
  .catch(next)
})