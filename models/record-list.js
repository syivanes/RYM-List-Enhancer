'use strict';
// const Record = require('./record')
module.exports = (sequelize, DataTypes) => {
  const RecordList = sequelize.define('recordList', {
    title: {
      type: DataTypes.STRING
    },
    rymUser: {
      type: DataTypes.STRING
    },
    rymId: {
      type: DataTypes.STRING
    }
  })

  return RecordList;
}

// RecordList.belongsToMany(Record, {through: 'RecordListRecord'});