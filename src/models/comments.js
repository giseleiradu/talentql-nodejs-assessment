'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comments.belongsTo(models.Post, {
      foreignKey: 'postId',
      targetKey: 'id'
    });
    Comments.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id'
    });
    Comments.belongsTo(models.User, {
      through: 'CommentLikes',
      foreignKey: 'commentId',
      targetKey: 'id',
    });
    }
  }
  Comments.init({
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        Key: 'id'
      }
    },
    postId: DataTypes.INTEGER,
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
    modelName: 'Comments',
  });
  return Comments;
};



