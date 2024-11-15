const Patient = require("../models/Patient.js");

// Fetch all patients
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients", error: error.message });
  }
};

// Add a new patient
const addPatient = async (req, res) => {
  const { name, id, status, lastVisit, diagnosis } = req.body;

  try {
    const newPatient = new Patient({ name, id, status, lastVisit, diagnosis });
    await newPatient.save();
    res.status(201).json({ message: "Patient added successfully", patient: newPatient });
  } catch (error) {
    res.status(500).json({ message: "Error adding patient", error: error.message });
  }
};

module.exports = { getPatients, addPatient };
