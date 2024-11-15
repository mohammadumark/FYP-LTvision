const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  status: { type: String, default: "Active" },
  lastVisit: { type: Date, required: true },
  diagnosis: { type: String, required: true },
}, { timestamps: true });

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
