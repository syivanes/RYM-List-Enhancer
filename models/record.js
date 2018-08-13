'use strict';
// const RecordList = require('./record-list');
// const RecordListRecord = require('./record-list-record');

module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('record', {
    artistName: {
      type: DataTypes.STRING
    },
    recordTitle: {
      type: DataTypes.STRING
    },
    rymId: {
      type: DataTypes.STRING
    },
    genre: {
      type: DataTypes.STRING
    },
    releaseYear: {
      type: DataTypes.STRING
    },
    discogsId: {
      type: DataTypes.STRING
    }, 
    embeddedMedia: {
      type: DataTypes.TEXT
    }
  })

  Record.associate = (models) => {
    models.Record.belongsToMany(models.RecordList, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    })
  }
  return Record
}