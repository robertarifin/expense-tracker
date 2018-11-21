'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    UserId: DataTypes.INTEGER,
    date_transaction: DataTypes.DATE
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.User)
  };
  return Transaction;
};