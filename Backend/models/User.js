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
    type: String, // Field for description
  },
  specialty: {
    type: String, // Field for specialty
  },
  isAvailable: {
    type: Boolean,
    default: false, // Availability status
  },
  profilePicture: {
    type: String, // URL or filename for the profile picture
    default: "https://default.profile.picture.url/placeholder.png", // Default profile picture
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
