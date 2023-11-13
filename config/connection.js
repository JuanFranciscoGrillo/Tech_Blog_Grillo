const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
    // For Heroku deployment using JawsDB MySQL add-on
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // Local database configuration
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exports = sequelize;
