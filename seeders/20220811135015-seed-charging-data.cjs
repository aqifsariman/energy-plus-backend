'use strict';

module.exports = {
  up: async (queryInterface) => {
    const chargingPoints = [
      {
        name: 'Jewel Changi Airport',
        connector: 'AC - J1772',
        lat: 1.360627,
        lng: 103.989971,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'VivoCity',
        connector: 'DC - CHAdeMO',
        lat: 1.264731,
        lng: 103.822443,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sentosa',
        connector: 'DC - CCS1',
        lat: 1.251452,
        lng: 103.821854,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Singapore Zoo',
        connector: 'DC - GB/T',
        lat: 1.405208,
        lng: 103.789591,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Paragon Orchard',
        connector: 'AC - GB/T',
        lat: 1.303752,
        lng: 103.835496,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert('charging_points', chargingPoints);
  },

  down: async (queryInterface) => {
    return await queryInterface.bulkDelete('charging_points', null, {});
  },
};
