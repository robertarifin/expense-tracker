"use strict"

const routes = require('express').Router()
const transactionController = require('../controllers/transactionController.js')

routes.get('/', transactionController.getTransactionList)

routes.get('/:id/add-income', transactionController.showIncomeForm)
routes.get('/:id', transactionController.getTransactionList)

routes.post('/:id/add-income', transactionController.addIncome)

routes.get('/:id/add-expense', transactionController.showExpenseForm)
routes.post('/:id/add-expense', transactionController.addExpense)


module.exports = routes