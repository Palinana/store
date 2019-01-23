const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const Order = require('./order')

Product.belongsTo(Category);
Order.belongsTo(User)

module.exports = {
  User,
  Product,
  Category,
  Order
}