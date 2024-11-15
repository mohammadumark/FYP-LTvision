const mongoose = require('mongoose');
const Counter = require('./counterModel'); // Import the counter model

// Define the schema for a patient
const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    doctorId: { type: String, required: true }, // Store doctorId as a string
    status: { type: String, required: true },
    lastVisit: { type: Date, required: true },
    diagnosis: { type: String, required: true },
    id: { type: Number, unique: true, required: false }, // Auto-incremented patient ID
  },
  { timestamps: true }
);

// Pre-validate hook to auto-increment the patient ID
patientSchema.pre('validate', async function (next) {
  try {
    // Auto-increment ID only if it hasn't been set already
    if (!this.id) {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'patientid' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );

      // Assign the incremented value to the patient's ID field
      this.id = counter.sequence_value;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Create and export the Patient model
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
