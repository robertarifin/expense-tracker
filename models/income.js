'use strict';
module.exports = (sequelize, DataTypes) => {
  const Income = sequelize.define('Income', {
    userId: DataTypes.INTEGER,
    date_transaction:  {
      type: DataTypes.DATE,
      validate: {
        isDate: true
        }
      },
    amount: DataTypes.INTEGER
  }, {});
  Income.associate = function(models) {
    Income.belongsTo(models.User)
  };
  return Income;
};