import React, { useState } from 'react';
import './RegisterScreen.css'; // Import CSS file for styling

const RegisterScreen = ({ switchToLogin }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateInputs = () => {
    let isValid = true;

    // Regular expression for a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Regular expression for a valid password: At least 8 characters with one special character
    const passwordRegex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (password.length < 8 || !passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters long and contain at least one special character');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  const handleRegister = () => {
    if (validateInputs()) {
      // Check if the email is already in use (simulated check)
      const emailExists = false; // Simulated result, replace with actual logic
      if (emailExists) {
        setEmailError('This email is already in use');
      } else {
        // Proceed with registration logic
        console.log('Registering user:', { fullName, email, password });
      }
    }
  };

  return (
    <div className="Register-container">
      <div className="image-container">
        {/* Image on left occupying 70% of the screen */}
        <img src="./src/assets/bgLogin1.jpg" alt="Register" className="login-image" />
      </div>
      <div className="form-container">
        <h2>
          <img src="./src/assets/logo.png" alt="LtVision Logo" className="logo-icon" />
          LtVision
        </h2>
        <div className="buttons-container">
          <button className="login-button" onClick={switchToLogin}>Login</button>
          <button className="signup-button" onClick={handleRegister}>Register</button>
        </div>
        
        <form>
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            {emailError && <div className="error">{emailError}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            {passwordError && <div className="error">{passwordError}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
            {confirmPasswordError && <div className="error">{confirmPasswordError}</div>}
          </div>
          <button
            type="button" // Change type to "button" to prevent form submission
            onClick={handleRegister}
            className="register-button"
          >
            Register
          </button>
          <div className="register-text">
            <p>Already have an account? <span onClick={switchToLogin}>Login here</span></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
