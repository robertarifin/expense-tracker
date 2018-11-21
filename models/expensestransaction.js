'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExpensesTransaction = sequelize.define('ExpensesTransaction', {
    TransactionId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    detail_transaction: DataTypes.STRING
  }, {});
  ExpensesTransaction.associate = function(models) {
    // associations can be defined here
  };
  return ExpensesTransaction;
};