const path = require('path')
const Sequelize = require('sequelize')
module.exports = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, './data/providers.sqlite3')
})
