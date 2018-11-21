'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    categoryName: DataTypes.STRING
  }, {});
  Expense.associate = function(models) {
    Expense.belongsToMany(models.Transaction, {through: models.ExpensesTransaction})
  };
  return Expense;
};