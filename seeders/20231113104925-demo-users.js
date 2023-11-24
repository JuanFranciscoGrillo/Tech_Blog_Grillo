// seeders/202311140001-user.js

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed the 'Users' table with an example user
    await queryInterface.bulkInsert('Users', [
      {
        username: 'john_doe',
        password: 'password', // In a real scenario, hash the password
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Remove all records from the 'Users' table
    await queryInterface.bulkDelete('Users', null, {});
  },
};
