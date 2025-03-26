const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpensesByCategory,
  getExpensesByDateRange,
} = require('../controllers/expense.controller');

// All routes are protected
router.use(verifyToken);

// CRUD operations
router.post('/', createExpense);
router.get('/', getExpenses);
router.get('/:id', getExpenseById);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

// Analytics routes
router.get('/category/:category', getExpensesByCategory);
router.get('/range/:startDate/:endDate', getExpensesByDateRange);

module.exports = router; 