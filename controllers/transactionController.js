"use strict"

const Model = require('../models/index')

class TransactionController {
    static showExpenseForm(req, res) {
        Model.Expense.findAll()
        .then(expense => {
            let obj = {
                data: expense,
                id: 2 || req.params.id,
                errorMessage : req.query.result
            }
            res.render('./pages/expense.ejs', obj)
        })
        .catch(err => {
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
                res.redirect('/transaction/2/add-income?result=success')
            })
            .catch((err) => {
                res.redirect(`/transaction/2/add-income?result=${err}`)
            })
        } else {
            res.redirect(`/transaction/2/add-income?result=minimal price is 500`)
        }
    }

    static showTransactionList(req, res) {
        // res.send(req.session.user);
        Model.Transaction.findOne({
            where: {id: req.session.user.id},
            include: [{model: Model.ExpenseTransaction}, {model: Model.Expense}]
        })
        .then(transaction => {

            // still not working
            res.send(transaction);
            // res.render('./pages/transaction.ejs');
        })
        .catch(err => {
            res.send({msg:`Error getting transaction list`, err:err});
        });
    }
}

module.exports = TransactionController