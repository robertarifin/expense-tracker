"use strict"

const Model = require('../models/index')

class TransactionController {
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
            console.log(err, `=========`);
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
                    console.log(' masa ga masuk')
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
}

module.exports = TransactionController