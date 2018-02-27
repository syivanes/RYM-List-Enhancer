const Sequelize = require('sequelize');
const sequelize = require('../db');
const RecordList = require('./record-list')

const Record = sequelize.define('record', {
  artistName: {
    type: Sequelize.STRING
  },
  recordTitle: {
    type: Sequelize.STRING
  },
  rymId: {
    type: Sequelize.STRING
  },
  genre: {
    type: Sequelize.STRING
  },
  releaseYear: {
    type: Sequelize.STRING
  }
})

Record.belongsToMany(RecordList, {through: 'RecordListRecord'});

module.exports = Record;