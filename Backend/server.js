const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const doctorRoutes = require('./routes/doctorRoutes'); // Fixed the typo here
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patientRoutes');
const path = require('path');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Database connection error:', err));
  

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', patientRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'routes', 'uploads')));
app.use('/api/doctorss', doctorRoutes); // Ensure the path to doctorRoutes matches the actual file structure
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
