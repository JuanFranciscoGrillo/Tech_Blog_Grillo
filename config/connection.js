// Import the Sequelize library
const Sequelize = require('sequelize');

// Import the dotenv library to load environment variables
require('dotenv').config();

// Create a variable to hold the Sequelize instance
let sequelize;

// Check if the JAWSDB_URL environment variable is set (for Heroku deployment)
if (process.env.JAWSDB_URL) {
  // If JAWSDB_URL is set, create a Sequelize instance using the URL
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If JAWSDB_URL is not set, create a Sequelize instance using local configuration
  sequelize = new Sequelize(
    process.env.DB_NAME, // Database name
    process.env.DB_USER, // Database username
    process.env.DB_PASSWORD, // Database password
    {
      host: process.env.DB_HOST, // Database host
      dialect: 'mysql', // Database dialect
      port: process.env.DB_PORT, // Database port
      logging: false, // Toggle logging if needed
      // Additional Sequelize configuration here
    }
  );
}

// Export the Sequelize instance
module.exports = sequelize;
