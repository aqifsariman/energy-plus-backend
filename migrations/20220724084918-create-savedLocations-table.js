'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('savedLocations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        validate: {
          notNull: {
            args: true,
            msg: 'Location name cannot be empty.',
          },
        },
      },
      address: {
        type: Sequelize.STRING,
        validate: {
          notNull: {
            args: true,
            msg: 'Address cannot be empty.',
          },
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
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
    await queryInterface.dropTable('locations');
  },
};
