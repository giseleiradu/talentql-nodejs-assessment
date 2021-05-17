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
      // define association here
      Post.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id'
      });
      Post.belongsToMany(models.User, {
        through: 'PostLikes',
        foreignKey: 'postId',
        targetKey: 'id',
      });
      Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        sourceKey: 'id',
        onDelete: 'CASCADE'
      });
    }
  }
  Post.init({
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      validate: {
        is: ['(http(s?):)([/|.|[A-Za-z0-9_-]| |-])*.(?:jpg|jpeg|gif|png)', 'i']
      }
    },
    userId: DataTypes.INTEGER,
    liked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    likeCounts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};