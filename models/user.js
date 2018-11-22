'use strict';
const encrypt = require('../helpers/encryptPassword');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
          isEmail: true,
          notNull: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [6, 20]
      }
    }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Transaction)
    User.hasMany(models.Income)
  };

  User.beforeCreate((user, options) => {
    user.password = encrypt(user.password);
  });
  return User;
};