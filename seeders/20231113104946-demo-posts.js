// seeders/202311140002-post.js

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed the 'Posts' table with a sample post
    await queryInterface.bulkInsert(
      'Posts',
      [
        {
          title: 'Sample Post Title',
          content: 'This is a sample post content.',
          userId: 1, // Assuming this user ID exists in your Users table
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Remove all records from the 'Posts' table
    await queryInterface.bulkDelete('Posts', null, {});
  },
};
