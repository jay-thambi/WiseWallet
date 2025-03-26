const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { email, password, name, university, major, graduationYear } = req.body;

    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Create user profile in Firestore
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      name,
      email,
      university,
      major,
      graduationYear,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Generate JWT token
    const token = jwt.sign(
      { uid: userRecord.uid },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        uid: userRecord.uid,
        name,
        email,
        university,
        major,
        graduationYear,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({
      message: 'Registration failed',
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sign in with Firebase Auth
    const userCredential = await admin.auth().signInWithEmailAndPassword(email, password);
    const userRecord = userCredential.user;

    // Get user profile from Firestore
    const userDoc = await admin.firestore().collection('users').doc(userRecord.uid).get();
    const userData = userDoc.data();

    // Generate JWT token
    const token = jwt.sign(
      { uid: userRecord.uid },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        uid: userRecord.uid,
        ...userData,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({
      message: 'Login failed',
      error: error.message,
    });
  }
};

const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userRecord = await admin.auth().getUser(decoded.uid);
    const userDoc = await admin.firestore().collection('users').doc(decoded.uid).get();
    const userData = userDoc.data();

    res.json({
      user: {
        uid: userRecord.uid,
        ...userData,
      },
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({
      message: 'Invalid token',
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  verifyToken,
}; 