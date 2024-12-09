const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path as needed

// Route to fetch all users (doctors)
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json(users); // Return all users in the response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users', details: err.message });
  }
});

// Route to fetch a doctor by doctorId
router.get('/:doctorId', async (req, res) => {
  try {
    const doctor = await User.findById(req.params.doctorId); // Fetch doctor by ID
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' }); // Handle case if doctor not found
    }
    res.status(200).json(doctor); // Return doctor details
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doctor', details: err.message });
  }
});

module.exports = router;
