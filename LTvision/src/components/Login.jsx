import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginScreen.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      setMessage(response.data.message);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleSignup = () => {
    navigate("/register");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="login-container-l">
      <div className="image-container">
        <img
          src="./src/assets/bgLogin1.jpg"
          alt="Login"
          className="login-image"
        />
      </div>
      <div className="form-container-l">
        <div className="header-container">
          <h2>
            <img
              src="./src/assets/logo.png"
              alt="LtVision Logo"
              className="logo-icon"
            />
            LtVision
          </h2>
        </div>
        <div className="buttons-container-l">
          <button className="login-button">Log in</button>
          <button className="signup-button" onClick={handleSignup}>
            Signup
          </button>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="forgot-password-container">
            <button
              type="button"
              className="forgot-password-link"
              onClick={handleForgotPassword}
            >
              Forgot password?
            </button>
          </div>
          <button type="submit" className="form-button-login">
            Log in
          </button>
          <p>{message}</p>
        </form>
        <div className="register-text">
          <p>
            Do not have an account? <a href="/register">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
