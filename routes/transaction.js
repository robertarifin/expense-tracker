"use strict"

const routes = require('express').Router()
const transactionController = require('../controllers/transactionController.js')

// routes.get('/', transactionController.getTransactionList)
routes.get('/', transactionController.showMonthlyInfo)

routes.get('/:id/add-income', transactionController.showIncomeForm)
routes.get('/:id', transactionController.getTransactionList)
routes.get('/:id/add-income', transactionController.showIncomeForm)
routes.post('/:id/add-income', transactionController.addIncome)

routes.get('/:id/add-expense', transactionController.showExpenseForm)
routes.post('/:id/add-expense', transactionController.addExpense)
routes.get('/:id/:transactionId/delete-expense', transactionController.deleteExpense)
routes.get('/:id/edit-expense', transactionController.showEditExpenseForm)
routes.post('/:id/edit-expense', transactionController.editExpenseForm)

module.exports = routes