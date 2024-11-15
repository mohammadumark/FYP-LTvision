const express = require('express');
const { getPatients, addPatient } = require('../controllers/patientController.js');

const router = express.Router();

router.get('/patients', getPatients);
router.post('/patients/add', addPatient);

module.exports = router;
