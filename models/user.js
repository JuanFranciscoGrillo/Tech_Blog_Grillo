/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
'use strict';

// Import necessary Sequelize modules
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// Define and export the User model
module.exports = (sequelize) => {
  class User extends Model {
    /**
     * Check password method
     */
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      User.hasMany(models.Post, { foreignKey: 'userId', onDelete: 'CASCADE' });
      User.hasMany(models.Comment, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }

  // Initialize the User model with its attributes and data types
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true, len: [3, 25] },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [8, 100] },
      },
    },
    {
      hooks: {
        beforeCreate: async (userData) => {
          userData.password = await bcrypt.hash(userData.password, 10);
          return userData;
        },
        beforeUpdate: async (userData) => {
          if (userData.changed('password')) {
            userData.password = await bcrypt.hash(userData.password, 10);
          }
          return userData;
        },
      },
      sequelize,
      modelName: 'User',
      timestamps: true,
    }
  );

  return User;
};
