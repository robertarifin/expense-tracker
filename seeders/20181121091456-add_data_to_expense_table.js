'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>  {
    return queryInterface.bulkInsert('Expenses', [{
      categoryName: 'Food & Beverage',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      categoryName: 'Shopping',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      categoryName: 'Bills',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      categoryName: 'Electronic',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Expenses', null, {});
  }
  };
