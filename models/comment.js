'use strict';

// Import necessary Sequelize modules
const { Model, DataTypes } = require('sequelize');

// Define and export the Comment model
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      // Associate Comment with User model using foreign key 'userId'
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });

      // Associate Comment with Post model using foreign key 'postId'
      Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        onDelete: 'CASCADE',
      });
    }
  }

  // Initialize the Comment model with its attributes and data types
  Comment.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      commentText: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 300], // Adjust the length according to your needs
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User', // Ensure this matches the table name exactly
          key: 'id',
        },
        onDelete: 'CASCADE', // Optional: Ensure referential integrity
      },
      postId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Post', // Ensure this matches the table name exactly
          key: 'id',
        },
        onDelete: 'CASCADE', // Optional: Ensure referential integrity
      },
    },
    {
      sequelize,
      modelName: 'Comment',
      timestamps: true,
    }
  );

  return Comment;
};
