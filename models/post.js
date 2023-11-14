'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });

      Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        as: 'comments', // Optional: specify an alias for the association
        onDelete: 'CASCADE'
      });
    }
  }

  Post.init({
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Ensures the title is not empty
        len: [1, 255] // Adjust length as needed
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true // Ensures the content is not empty
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User', // Ensure this matches the table name exactly
        key: 'id'
      },
      onDelete: 'CASCADE' // Optional: Ensure referential integrity
    }
  }, {
    sequelize,
    modelName: 'Post',
    timestamps: true
  });

  return Post;
};
