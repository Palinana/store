const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  price: Sequelize.DECIMAL,
  description: Sequelize.TEXT, 
  color: Sequelize.STRING, 
  width: Sequelize.INTEGER,
  height: Sequelize.INTEGER,
  quantity: Sequelize.INTEGER,
  image: Sequelize.STRING
})

module.exports = Product;