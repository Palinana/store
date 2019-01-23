const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

let options = {
  logging: false
}

if (process.env.NODE_ENV === 'production') {
  options = {...options,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true
      }
    }
  }
}

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`, options
)
module.exports = db