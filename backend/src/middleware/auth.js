const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userRecord = await admin.auth().getUser(decoded.uid);
    req.user = userRecord;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      message: 'Invalid token',
      error: error.message,
    });
  }
};

module.exports = {
  verifyToken,
}; 