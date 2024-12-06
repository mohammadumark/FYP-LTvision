const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  hospitalName: {
    type: String,
  },
  description: {
    type: String, // New field for description
  },
  specialty: {
    type: String, // New field for specialty
  },
  isAvailable: {
    type: Boolean,
    default: false, // Default to false if not set
  },
  
});


const User = mongoose.model('User', userSchema);

module.exports = User;
