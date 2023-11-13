'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
  /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  static associate(models) {
    // Post belongs to User model with a foreign key 'userId' and cascade delete
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    // Post has many Comments with a foreign key 'postId' and cascade delete
    Post.hasMany(models.Comment, {
      foreignKey: 'postId',
      onDelete: 'CASCADE'
    });
  }
}

Post.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Post',
});

return Post;
};