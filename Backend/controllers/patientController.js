const Patient = require('../models/patient.js');

// Helper function to determine color based on status and diagnosis
const getStatusColor = (status) => {
  switch (status) {
    case 'Active':
      return 'green';
    case 'Non-Active':
      return 'red';
    case 'New Patient':
      return 'blue';
    default:
      return 'black';
  }
};

const getDiagnosisColor = (diagnosis) => {
  return diagnosis === 'Diagnosed' ? 'red' : 'green';
};

// Fetch all patients
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();

    // Add color fields based on status and diagnosis
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
  const { name, doctorId, status, lastVisit, diagnosis } = req.body;

  try {
    // Create a new patient document
    const newPatient = new Patient({ name, doctorId, status, lastVisit, diagnosis });
    await newPatient.save();

    // Add color fields to the new patient object before responding
    const patientWithColors = {
      ...newPatient.toObject(),
      statusColor: getStatusColor(newPatient.status),
      diagnosisColor: getDiagnosisColor(newPatient.diagnosis),
    };

    res.status(201).json({ message: 'Patient added successfully', patient: patientWithColors });
  } catch (error) {
    res.status(500).json({ message: 'Error adding patient', error: error.message });
  }
};

module.exports = { getPatients, addPatient };
