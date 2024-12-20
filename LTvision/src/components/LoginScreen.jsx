import React, { useState } from 'react';
import './LoginScreen.css'; // Import CSS file for styling

const LoginScreen = ({ switchToSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateCredentials = () => {
    let isValid = true;

    // Regular expression for a valid username: 3 to 20 characters, alphanumeric with underscore allowed
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      setUsernameError('Username must be 3 to 20 characters long and contain only letters, numbers, and underscores');
      isValid = false;
    } else {
      setUsernameError('');
    }

    // Regular expression for a valid password: 8 to 20 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,20}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be 8 to 20 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleLogin = () => {
    if (validateCredentials()) {
      console.log('Logging in with:', { username, password, rememberMe });
      // Implement your login logic here
    }
  };

  const handleSignup = () => {
    switchToSignup(); // Call the switchToSignup function passed from the App component
  };

  const handleForgotPassword = () => {
    // Implement your forgot password logic here
    console.log('Redirecting to forgot password page');
  };

  const handleCheckboxChange = (event) => {
    setRememberMe(event.target.checked);
  };

  return (
    <div className="login-container">
      <div className="image-container">
        {/* Image on left occupying 70% of the screen */}
        <img src="./src/assets/bgLogin1.jpg" alt="Login" className="login-image" />
      </div>
      <div className="form-container">
        <h2>
          <img src="./src/assets/logo.png" alt="LtVision Logo" className="logo-icon" />
          LtVision
        </h2>
        <div className="buttons-container">
          <button className="login-button" onClick={handleLogin}>Login</button>
          <button className="signup-button" onClick={handleSignup}>Register</button>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
            {usernameError && <div className="error">{usernameError}</div>}
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
          <div className="form-row">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <div className="forgot-password">
              <span onClick={handleForgotPassword}>Forgot password?</span>
            </div>
          </div>
          <button
            type="button" // Change type to "button" to prevent form submission
            onClick={handleLogin}
            className="login-button2"
          >
            Login
          </button>
        </form>
        <div className="register-text">
          <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
