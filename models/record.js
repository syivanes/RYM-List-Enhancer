'use strict';
module.exports = (sequelize, DataTypes) => {
  var Record = sequelize.define('Record', {
    artistName: DataTypes.STRING,
    recordTitle: DataTypes.STRING,
    rymId: DataTypes.STRING,
    genre: DataTypes.STRING,
    releaseYear: DataTypes.STRING,
    discogsId: DataTypes.STRING,
    embeddedMedia: DataTypes.TEXT
  }, {});
  Record.associate = function(models) {
    // associations can be defined here
    models.Record.belongsToMany(models.RecordList,
			{
				through: 'RecordListRecord',
				onDelete: "CASCADE",
				foreignKey: 'recordId'
			})
  };
  return Record;
};
