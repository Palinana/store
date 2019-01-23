const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  confirmationCode: Sequelize.STRING,
  cart: {
    type: Sequelize.JSON
  },
  total: {
    type: Sequelize.DECIMAL(10,2)
  },
  status: {
    type: Sequelize.ENUM('COMPLETE', 'IN PROCESS'),
    defaultValue: 'COMPLETE'
  }
})

Order.beforeCreate((instance) => { 
  if (typeof(instance.products) !== 'string') {
    JSON.stringify(instance.products)
  } 
})

module.exports = Order
