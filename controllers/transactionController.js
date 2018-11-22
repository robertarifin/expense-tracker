"use strict"

const Model = require('../models/index')

class TransactionController {
    static showMonthlyInfo(req, res) {
        let totalExpense = []
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
            let items = []
            let currentMonth = new Date().getMonth()
            let currentYear = new Date().getFullYear()
            let expense = 0
            let income = 0

            for (let i = 1; i <= 12; i++) {
                let monthlyExpense = 0

                for (let j = 0; j < totalExpense.length; j++) {  
                    let month = new Date(totalExpense[j].date_transaction).getMonth() + 1
                    
                    if (month == i) {
                        monthlyExpense += totalExpense[j].Expenses[0].ExpensesTransaction.price
                    }      
                }
                
                items.push({
                    x: i,
                    y: monthlyExpense 
                })
            }


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
                }
            }

            let obj = {
                expense: expense,
                income: income,
                money: income - expense,
                items: items
            }

            console.log(obj.items)
        
            res.render('./pages/transaction.ejs', obj)
        })
        .catch(err => {
            res.send(err)
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
        Model.Transaction.findAll( {
            where: {
                UserId: 5
            },
            include: [{
                model: Model.Expense,
                include: [{
                model: Model.User,
                }]
            }]
        })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
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
}


module.exports = TransactionController