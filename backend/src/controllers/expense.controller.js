const admin = require('firebase-admin');

const createExpense = async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;
    const userId = req.user.uid;

    const expenseData = {
      userId,
      description,
      amount: parseFloat(amount),
      category,
      date: new Date(date),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await admin.firestore().collection('expenses').add(expenseData);
    const expense = { id: docRef.id, ...expenseData };

    res.status(201).json({
      message: 'Expense created successfully',
      expense,
    });
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(400).json({
      message: 'Failed to create expense',
      error: error.message,
    });
  }
};

const getExpenses = async (req, res) => {
  try {
    const userId = req.user.uid;
    const snapshot = await admin
      .firestore()
      .collection('expenses')
      .where('userId', '==', userId)
      .orderBy('date', 'desc')
      .get();

    const expenses = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(expenses);
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(400).json({
      message: 'Failed to get expenses',
      error: error.message,
    });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.uid;

    const doc = await admin
      .firestore()
      .collection('expenses')
      .doc(id)
      .get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const expense = doc.data();
    if (expense.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    res.json({ id: doc.id, ...expense });
  } catch (error) {
    console.error('Get expense error:', error);
    res.status(400).json({
      message: 'Failed to get expense',
      error: error.message,
    });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, category, date } = req.body;
    const userId = req.user.uid;

    const doc = await admin
      .firestore()
      .collection('expenses')
      .doc(id)
      .get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const expense = doc.data();
    if (expense.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const updateData = {
      description,
      amount: parseFloat(amount),
      category,
      date: new Date(date),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await admin.firestore().collection('expenses').doc(id).update(updateData);
    const updatedExpense = { id, ...expense, ...updateData };

    res.json({
      message: 'Expense updated successfully',
      expense: updatedExpense,
    });
  } catch (error) {
    console.error('Update expense error:', error);
    res.status(400).json({
      message: 'Failed to update expense',
      error: error.message,
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.uid;

    const doc = await admin
      .firestore()
      .collection('expenses')
      .doc(id)
      .get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const expense = doc.data();
    if (expense.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    await admin.firestore().collection('expenses').doc(id).delete();

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(400).json({
      message: 'Failed to delete expense',
      error: error.message,
    });
  }
};

const getExpensesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const userId = req.user.uid;

    const snapshot = await admin
      .firestore()
      .collection('expenses')
      .where('userId', '==', userId)
      .where('category', '==', category)
      .orderBy('date', 'desc')
      .get();

    const expenses = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(expenses);
  } catch (error) {
    console.error('Get expenses by category error:', error);
    res.status(400).json({
      message: 'Failed to get expenses by category',
      error: error.message,
    });
  }
};

const getExpensesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.params;
    const userId = req.user.uid;

    const snapshot = await admin
      .firestore()
      .collection('expenses')
      .where('userId', '==', userId)
      .where('date', '>=', new Date(startDate))
      .where('date', '<=', new Date(endDate))
      .orderBy('date', 'desc')
      .get();

    const expenses = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(expenses);
  } catch (error) {
    console.error('Get expenses by date range error:', error);
    res.status(400).json({
      message: 'Failed to get expenses by date range',
      error: error.message,
    });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpensesByCategory,
  getExpensesByDateRange,
}; 