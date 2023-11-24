// Import the Sequelize library
const Sequelize = require('sequelize');

// Import the dotenv library to load environment variables
require('dotenv').config();

// Default configuration constants for the database connection
const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = 3306;
const DEFAULT_DATABASE = 'tech_blog_Grillo';
const DEFAULT_USERNAME = 'root';
const DEFAULT_PASSWORD = 'hello';

// Declare a variable to hold the Sequelize instance
let sequelize;

// Check if the JAWSDB_URL environment variable is set (Heroku production)
if (process.env.JAWSDB_URL) {
  // Production configuration for Heroku deployment using JawsDB MySQL add-on
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Local development and test configuration
  // If environment variables are not set, use default values
  const host = process.env.DB_HOST || DEFAULT_HOST;
  const port = process.env.DB_PORT || DEFAULT_PORT;
  const database = process.env.DB_NAME || DEFAULT_DATABASE;
  const username = process.env.DB_USER || DEFAULT_USERNAME;
  const password = process.env.DB_PASSWORD || DEFAULT_PASSWORD;

  // Sequelize initialization for local configuration
  sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'mysql',
    port,
  });
}

// Export the configured Sequelize instance for use in other parts of the application
module.exports = sequelize;
