const express = require('express');
const router = express.Router();
const { register, login, verifyToken } = require('../controllers/auth.controller');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/verify', verifyToken);

module.exports = router; 