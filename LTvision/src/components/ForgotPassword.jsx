// ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showResetForm, setShowResetForm] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/forgot-password', { email });
            setMessage(response.data.message);
            if (response.data.success) {
                setShowResetForm(true);
            } else {
                setShowResetForm(false); // Reset form should not be shown if email doesn't exist
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else if (error.request) {
                setMessage('Server did not respond. Please try again later.');
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/reset-password', { email, newPassword, confirmNewPassword });
            setMessage(response.data.message);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else if (error.request) {
                setMessage('Server did not respond. Please try again later.');
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="container">
            <div className="forgot-password-form">
                <h2>Forgot Password</h2>
                <p>Enter your email address to reset your password</p>
                <form onSubmit={handleForgotPassword}>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                    <button type="submit">Send Email</button>
                </form>
                <p>{message}</p>
                {showResetForm && (
                    <form onSubmit={handleResetPassword}>
                        <label htmlFor="newPassword">New Password</label>
                        <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" required />
                        <label htmlFor="confirmNewPassword">Confirm New Password</label>
                        <input type="password" id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder="Confirm new password" required />
                        <button type="submit">Reset Password</button>
                    </form>
                )}
                <a href="/login" className="back-to-login">Back to Login</a>
            </div>
        </div>
    );
};

export default ForgotPassword;
