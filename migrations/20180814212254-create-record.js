'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Records', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
      },
      discogsId: {
        type: Sequelize.STRING
      },
      embeddedMedia: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Records');
  }
};