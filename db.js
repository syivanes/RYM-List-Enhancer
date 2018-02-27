const Sequelize = require('sequelize');
const sequelize = new Sequelize('rym-lists', 'sergeyivanes', '', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;