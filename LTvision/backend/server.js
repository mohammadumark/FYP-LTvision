const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mongoURI = 'mongodb://localhost:27017/LY_auth';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    phoneNo: { type: String },
    bloodGroup: { type: String },
    hospital: { type: String }
});

const User = mongoose.model('User', userSchema);

const JWT_SECRET = 'your_jwt_secret_key';

// Signup Route
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'Email already exists', success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ message: 'User signed up successfully!', success: true });
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password', success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password', success: false });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful!', success: true, token });
});

// Forgot Password Route
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'Email not found', success: false });
    }

    res.status(200).json({ message: 'Email found in the database. Set new password.', success: true });
});

// Reset Password Route
app.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'Email not found', success: false });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully!', success: true });
});

// Update Profile Route
app.put('/update-profile', async (req, res) => {
    console.log('Update profile request received:', req.body);
    const { email, name, phoneNo, bloodGroup, hospital } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { email },
            { name, phoneNo, bloodGroup, hospital },
            { new: true }
        );

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found', success: false });
        }

        res.status(200).json({ message: 'Profile updated successfully!', success: true });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Error updating profile', success: false });
    }
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
