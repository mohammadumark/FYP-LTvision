const express = require('express');
const { getPatients, addPatient } = require('../controllers/patientController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/patients', authenticateToken, getPatients);
router.post('/patients/add', authenticateToken, addPatient);

module.exports = router;
