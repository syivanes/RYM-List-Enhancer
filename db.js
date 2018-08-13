const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  database: 'rym-lists',
  username: 'sergeyivanes',
  password: null,
  host: 'localhost',
  dialect: 'postgres',
  protocol: 'postgres'
});

module.exports = sequelize;