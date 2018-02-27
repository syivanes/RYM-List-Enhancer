const Sequelize = require('sequelize');
const sequelize = require('../db');
const Record = require('./record')

const RecordList = sequelize.define('recordList', {
  title: {
    type: Sequelize.STRING
  },
  rymUser: {
    type: Sequelize.STRING
  },
  rymId: {
    type: Sequelize.STRING
  }
})

// RecordList.belongsToMany(Record, {through: 'RecordListRecord'});

module.exports = RecordList;