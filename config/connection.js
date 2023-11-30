// Import the Sequelize library
const Sequelize = require('sequelize');

// Create a variable to hold the Sequelize instance
let sequelize;

// Hardcoded environment variables
const DB_NAME = 'tech_blog_Grillo';
const DB_USER = 'root';
const DB_PASSWORD = 'hello';
const DB_HOST = 'localhost';
const DB_PORT = 3306;
const SESSION_SECRET = 'Super secret secret';

// Debug: Log the hardcoded environment variables
console.log('Database Name:', DB_NAME);
console.log('Database User:', DB_USER);
console.log('Database Password:', DB_PASSWORD);
console.log('Database Host:', DB_HOST);
console.log('Database Port:', DB_PORT);

// Check if the JAWSDB_URL environment variable is set (for Heroku deployment)
if (process.env.JAWSDB_URL) {
  console.log('Using JAWSDB_URL for the database connection.');
  // If JAWSDB_URL is set, create a Sequelize instance using the URL
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  console.log('Using local database configuration.');
  // If JAWSDB_URL is not set, create a Sequelize instance using local configuration
  sequelize = new Sequelize(
    DB_NAME, // Database name
    DB_USER, // Database username
    DB_PASSWORD, // Database password
    {
      host: DB_HOST, // Database host
      dialect: 'mysql', // Database dialect
      port: DB_PORT, // Database port
      logging: true, // Toggle logging if needed
      // Additional Sequelize configuration here
    }
  );
}

// Export the Sequelize instance
module.exports = sequelize;
