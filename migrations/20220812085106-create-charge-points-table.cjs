'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('charging_points', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.TEXT,
        unique: true,
      },
      connector: {
        type: Sequelize.TEXT,
      },
      lat: {
        type: Sequelize.NUMERIC,
        unique: true,
      },
      lng: {
        type: Sequelize.NUMERIC,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('charging_points');
  },
};
