const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// Fetch current user's phone number
router.get('/phone', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from the decoded token (req.user is set by middleware)
    const user = await User.findById(userId).select('phoneNumber'); // Fetch only the phone number field

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ phoneNumber: user.phoneNumber });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;
