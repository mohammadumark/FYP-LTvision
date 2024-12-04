const Patient = require('../models/patient');
const jwt = require('jsonwebtoken');

// Helper function for color coding
const getStatusColor = (status) => {
  switch (status) {
    case 'Active': return 'green';
    case 'Non-Active': return 'red';
    case 'New Patient': return 'blue';
    default: return 'black';
  }
};

const getDiagnosisColor = (diagnosis) => {
  return diagnosis === 'Diagnosed' ? 'red' : 'green';
};

// Fetch all patients
const getPatients = async (req, res) => {
  try {
    const doctorId = req.user.id; // Extracted from JWT
    const patients = await Patient.find({ doctorId });

    const patientsWithColors = patients.map((patient) => ({
      ...patient.toObject(),
      statusColor: getStatusColor(patient.status),
      diagnosisColor: getDiagnosisColor(patient.diagnosis),
    }));

    res.status(200).json(patientsWithColors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
};

// Add a new patient
const addPatient = async (req, res) => {
  const { name, status, lastVisit, diagnosis } = req.body;

  try {
    const doctorId = req.user.id; // Extracted from JWT
    if (!doctorId) {
      return res.status(400).json({ message: 'Doctor ID is missing' });
    }

    const newPatient = new Patient({ name, doctorId, status, lastVisit, diagnosis });
    await newPatient.save();

    res.status(201).json({
      message: 'Patient added successfully',
      patient: {
        ...newPatient.toObject(),
        statusColor: getStatusColor(newPatient.status),
        diagnosisColor: getDiagnosisColor(newPatient.diagnosis),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding patient', error: error.message });
  }
};

// Remove a patient
const removePatient = async (req, res) => {
  const { id } = req.params;

  try {
    // Ensure the ID is cast to ObjectId
    const patientId = mongoose.Types.ObjectId(id);
    const patient = await Patient.findByIdAndDelete(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing patient', error: error.message });
  }
};

module.exports = { getPatients, addPatient, removePatient };
