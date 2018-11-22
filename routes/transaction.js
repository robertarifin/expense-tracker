"use strict"

const routes = require('express').Router()
const transactionController = require('../controllers/transactionController.js')

routes.get('/', transactionController.showTransactionList)

routes.get('/:id/add-expense', (req, res) => {

})

routes.post('/:id/add-expense', (req, res) => {

})

routes.get('/:id/add-income', transactionController.showExpenseForm)
routes.post('/:id/add-income', transactionController.addExpense)

routes.post('/:id/add-income', (req, res) => {

})

module.exports = routes