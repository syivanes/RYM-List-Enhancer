const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  database: 'rym-lists',
  username: 'sergeyivanes',
  password: null,
  host: 'localhost',
  dialect: 'postgres'.toString(),
  protocol: 'postgres'
});

module.exports = sequelize;