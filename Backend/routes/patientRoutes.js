// In patientRoutes.js

const express = require('express');
const router = express.Router();
const { getPatients, addPatient, removePatient } = require('../controllers/patientController');

// Protect these routes with authentication middleware
const authMiddleware = require('../middleware/authMiddleware');

router.get('/patients', authMiddleware, getPatients);
router.post('/patients/add', authMiddleware, addPatient);
router.delete('/patients/remove/:id', authMiddleware, removePatient); // DELETE route for patient removal

module.exports = router;
