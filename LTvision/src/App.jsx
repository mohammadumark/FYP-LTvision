// App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import MyProfile from './components/MyProfile';
import Appointments from './components/Appointments';
import Patients from './components/Patients';
import Chats from './components/Chats';
import Alerts from './components/FileUpload';
import Signup from './components/Signup';
import Login from './components/Login';
import PatientProfile from './components/PatientProfile';
import ForgotPassword from './components/ForgotPassword';
import FileUpload from './components/FileUpload';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/';
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/profile/:id" element={<PatientProfile />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/alerts" element={<FileUpload />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
