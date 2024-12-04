const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// JWT secret key
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with a secure key

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from header
  if (!token) return res.sendStatus(401); // No token, unauthorized

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token invalid, forbidden
    req.user = user; // Save user info to request
    next(); // Proceed to the next middleware or route handler
  });
};

// Registration route
router.post('/register', async (req, res) => {
  const { username, email, password, phoneNumber, bloodGroup, hospitalName, description, specialty } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      bloodGroup,
      hospitalName,
      description,
      specialty,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Profile route to get the current user's information
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Find the user by ID stored in the token
    const user = await User.findById(req.user.id).select('-password'); // Exclude password from the response
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user); // Send user data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update Profile route
router.put('/profile', authenticateToken, async (req, res) => {
  const { 
    username, 
    email, 
    phoneNumber, 
    bloodGroup, 
    hospitalName, 
    description, 
    specialty 
  } = req.body;

  try {
    // Find the user by ID stored in the token
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user fields
    user.username = username || user.username;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.bloodGroup = bloodGroup || user.bloodGroup;
    user.hospitalName = hospitalName || user.hospitalName;
    user.description = description || user.description;
    user.specialty = specialty || user.specialty;

    await user.save(); // Save the updated user data
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
