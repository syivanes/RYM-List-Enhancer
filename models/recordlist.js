'use strict';
module.exports = (sequelize, DataTypes) => {
  var RecordList = sequelize.define('RecordList', {
    title: DataTypes.STRING,
    rymUser: DataTypes.STRING,
    rymId: DataTypes.STRING
  }, {});
  RecordList.associate = function(models) {
    // associations can be defined here
  };
  return RecordList;
};