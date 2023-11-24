// seeders/202311140003-comment.js

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed the 'Comments' table with a sample comment
    await queryInterface.bulkInsert(
      'Comments',
      [
        {
          content: 'This is a sample comment.',
          userId: 1, // Assuming this user ID exists
          postId: 1, // Assuming this post ID exists
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Remove all records from the 'Comments' table
    await queryInterface.bulkDelete('Comments', null, {});
  },
};
