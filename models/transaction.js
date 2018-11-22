'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    UserId: DataTypes.INTEGER,
    date_transaction:  {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
  }, {
    hooks: {
      afterCreate: (input, options) => {
        return sequelize.models.ExpensesTransaction.create({
          UserId: input.UserId,
          TransactionId: input.id,
          CategoryId: options.CategoryId,
          price: options.price,
          detail_transaction: options.detail_transaction
        })
        .then((data) => {
  
        })
        .catch((err) => {
          throw(err)
        })
      },
      afterDestroy: (input, options) => {
        return sequelize.models.ExpensesTransaction.destroy({where: {TransactionId: input.id}})
        .then(data => {

        })
        .catch(err => {
          throw(err)
        })
      }
    }
  });

  Transaction.associate = function(models) {
    Transaction.belongsTo(models.User)
    Transaction.belongsToMany(models.Expense, {through: models.ExpensesTransaction, foreignKey: 'TransactionId'})
  };
  return Transaction;
};