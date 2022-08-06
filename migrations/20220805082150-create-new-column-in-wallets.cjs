module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('wallets', 'cardId', Sequelize.STRING);
  },
  async down(queryInterface) {
    await queryInterface.removeColumn('wallets', 'cardId');
  },
};
