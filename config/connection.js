const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  // For Heroku deployment using JAWSDB MySQL add-on
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Localhost configuration
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: process.env.DB_PORT,
      logging: false, // Toggle logging if needed
      // Additional Sequelize configuration here
    }
  );
}

module.exports = sequelize;
