'use strict';

// Import required modules
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// Import and set up environment variables
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;

// Check if the configuration specifies using an environment variable
if (config.use_env_variable) {
  // Create a Sequelize instance using the environment variable
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Create a Sequelize instance using the configuration parameters
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Read and load model files from the current directory
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file) => {
    // Initialize each model and associate it with the Sequelize instance
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Associate models if they have an 'associate' method
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export the Sequelize instance and Sequelize module
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
