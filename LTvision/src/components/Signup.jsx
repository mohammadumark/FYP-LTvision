// Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import './RegisterScreen.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/signup', {
                fullname,
                email,
                password,
                confirm_password: confirmPassword
            });
            setMessage(response.data.message);
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                navigate('/login');
            }
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="Register-container-s">
           <div className="relative image-container">
    <img
        src="./src/assets/bgLogin1.jpg"
        alt="Register"
        className="login-image w-full h-full object-cover mix-blend-multiply"
    />
    <div className="absolute inset-0 bg-blue-500 opacity-50"></div>
</div>

            <div className="form-container-s">
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
                <div className="buttons-container-s">
                    <button className="login-button" onClick={() => navigate('/login')}>Log in</button>
                    <button className="register-button">Signup</button>
                </div>
                <form onSubmit={handleSignup}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Fullname" 
                            value={fullname} 
                            onChange={(e) => setFullname(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            placeholder="Email" 
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
                    <div className="form-group">
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="form-button-s">Register</button>
                    <p>{message}</p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
