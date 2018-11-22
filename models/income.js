'use strict';
module.exports = (sequelize, DataTypes) => {
  const Income = sequelize.define('Income', {
    UserId: DataTypes.INTEGER,
    date_transaction:  {
      type: DataTypes.DATE,
      validate: {
        isDate: true
        }
      },
    amount: {
      type: DataTypes.INTEGER,
      validate: {
        min: 10000,
        max: 30000000
      }
    } 
    
  }, {});
  Income.associate = function(models) {
    Income.belongsTo(models.User)
  };
  return Income;
};