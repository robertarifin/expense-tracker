"use strict"

const Model = require('../models/index')

class TransactionController {
    static showExpenseForm(req, res) {
        Model.Expense.findAll()
        .then(data => {
            let obj = {
                id: req.session.user.id,
                errorMessage : req.query.result || ''
            }
            
            res.send(data)
            res.render('../views/pages/expense.ejs', obj)
        })
        .catch(err => {
           console.log(err)
            res.redirect('/transaction/2/add-income')
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
                res.redirect('/transaction/2/add-expense?result=success')
            })
            .catch((err) => {
                res.redirect(`/transaction/2/add-expense?result=${err}`)
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
                res.send(data)
                res.redirect('/transaction/2/add-income?result=success')
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