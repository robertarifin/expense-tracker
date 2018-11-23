"use strict"

const Model = require('../models/index')
const Op = Model.Sequelize.Op

class TransactionController {
    static showMonthlyInfo(req, res) {
        let totalExpense = []
        let startDate = new Date(new Date(req.query.fromDate) - 24 * 60 * 60 * 1000) || null
        let untilDate = new Date(new Date(req.query.untilDate) - 24 * 60 * 60 * 1000) || null

        console.log(startDate, '=====')
        Model.Transaction.findAll({
            where: {
                UserId: req.session.user.id,
            },
            include: {
                model: Model.Expense
            }
        })
        .then(expenses => {
            totalExpense = expenses

            return Model.Income.findAll( {
                where: {
                    UserId: req.session.user.id
                }
            })
        })
        .then(incomes => {
            let currentYear = new Date().getFullYear()
            let currentMonth = new Date().getMonth()
            let expense = 0
            let income = 0
            
            for (let i = 0; i < incomes.length; i++) {
                let month = new Date(incomes[i].date_transaction).getMonth()
                let year = new Date(incomes[i].date_transaction).getFullYear()

                if (month == currentMonth && year == currentYear) {
                    income +=  incomes[i].amount
                }
            }
            
            for (let i = 0; i < totalExpense.length; i++) {
                let month = new Date(totalExpense[i].date_transaction).getMonth()
                let year = new Date(totalExpense[i].date_transaction).getFullYear()
           
                if (month == currentMonth  && year == currentYear) {
                    expense += totalExpense[i].Expenses[0].ExpensesTransaction.price
                } else {
                    if (startDate == null) {
                    
                    } else {
                        if (totalExpense[i].date_transaction < startDate || totalExpense[i].date_transaction > untilDate) {
                            totalExpense.splice(i, 1);
                        }
                     }
                    }
                }
        
        let obj = {
            expense: expense,
            income: income,
            money: income - expense,
            data: totalExpense
        }
    
        res.render('./pages/transaction.ejs', obj)
    })
    .catch(err => {
        res.send(err)
    })   
    }

    static showEditExpenseForm(req, res) {
        Model.ExpensesTransaction.findOne({
            where: {
                TransactionId: req.params.id
            }
        })
        .then(data =>{
            let obj = {
                id: req.params.id,
                price: data.price,
                description: data.detail_transaction,
                errorMessage: req.query.result || ''
            }

            res.render('./pages/editExpense.ejs', obj)
        })
    }

    static editExpenseForm(req, res) {
        Model.ExpensesTransaction.update( {
                price: req.body.price,
                detail_transaction: req.body.detail
            }, {
                where: {
                    TransactionId: req.params.id
                }
            }
        )
        .then(data =>{
            res.redirect(`/transaction?result=edit expense success`)
        })
        .catch(err => {
            if (err.errors[0].message == 'Validation min on price failed') {
                res.redirect(`/transaction/${req.params.id}/edit-expense?result=minimal price is 500`)
            }
          
        })
    }
   
    static showExpenseForm(req, res) {
        Model.Expense.findAll()
        .then(data => {
            let obj = {
                id: req.params.id,
                data: data,
                errorMessage : req.query.result || ''
            }
        
            res.render('./pages/expense.ejs', obj)
            })
        .catch(err => {
                res.send(err)
        })
    }

    static getTransactionList(req, res) {
        
        // res.send(req.session.user)
        Model.Transaction.findAll( {
            where: {
                UserId: req.session.user.id
            },
            include: [
                {model: Model.Expense}, {model: Model.User}
            ]        
        })
        .then((data) => {
            console.log(data[0].Expenses[0].ExpensesTransaction.price);
            // console.log(data[0].Expenses.categoryName, `========`);
            // res.send(data)
            res.render('./pages/transaction.ejs', {data: data});
        })
        .catch((err) => {
            // console.log(err, `=========`);
            res.send(err)
        })
    }

    static addExpense(req, res) {
        if(req.body.price > 500) {
            let input = {
                CategoryId: req.body.categoryId,
                price: req.body.price,
                detail_transaction: req.body.detail
            }

            Model.Transaction.create({
                date_transaction: req.body.date,
                UserId: req.params.id
            }, input)
            .then((data) => {
                res.redirect(`/transaction/?result=success`)
            })
            .catch((err) => {
                if (err.errors[0].message == 'Validation isDate on date_transaction failed') {
                    res.redirect(`/transaction/2/add-expense?result=invalid date`)
                } else {
                    res.redirect(`/transaction/2/add-expense?result=${err}`)
                }
            })
        } else {
            res.redirect(`/transaction/2/add-expense?result=minimal price is 500`)
        }
    }

    static showIncomeForm(req, res) {
        let obj = {
            errorMessage : req.query.result || ''
        }

        res.render('./pages/income.ejs', obj)
    }

    static addIncome(req, res) {
        if(req.body.amount > 500) {
            let input = {
                CategoryId: req.body.categoryId,
                price: req.body.price,
                detail_transaction: req.body.detail,
                message: req.query.result || ''
            }

            Model.Income.create({
                date_transaction: req.body.date,
                UserId: req.params.id,
                amount: req.body.amount 
            }, input)
            .then((data) => {
                res.redirect(`/transaction/?result=success`)
            })
            .catch((err) => {
                if (err.errors[0].message == 'Validation isDate on date_transaction failed') {
                    res.redirect(`/transaction/2/add-income?result=invalid date`)
                } else {
                    res.redirect(`/transaction/2/add-income?result=${err}`)
                }
            })
        } else {
            res.redirect(`/transaction/2/add-income?result=minimal price is 500`)
        }
    }

    static deleteExpense(req, res) {
        Model.Transaction.destroy({where: {id: req.params.transactionId}})
        .then(() => {
            res.redirect('/transaction');
        })
        .catch(err => {
            res.send(err);
        })
        // res.send(req.params);
    }
}


module.exports = TransactionController