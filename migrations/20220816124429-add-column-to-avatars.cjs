'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'avatars',
          'link',
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('avatars', 'link', { transaction: t }),
      ]);
    });
  },
};
