'use strict';
const encrypt = require('../helpers/encryptPassword');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Transaction)
  };

  User.beforeCreate((user, options) => {
    user.password = encrypt(user.password);
  });
  return User;
};