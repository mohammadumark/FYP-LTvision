import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  const handleLogout = () => {
    // Clear token from localStorage or perform any other necessary logout actions
    localStorage.removeItem('token');
    // Redirect to the login page
    window.location.href = '/login'; // Assuming your login page route is '/login'
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">Welcome</div>
        <div className="search-form">
          <input className="search-input" type="search" placeholder="Search" aria-label="Search" />
          <button className="search-btn" type="submit">Search</button>
        </div>
        <div className="icons">
          <FontAwesomeIcon icon={faBell} className="notification-icon" />
          <FontAwesomeIcon icon={faCog} className="settings-icon" />
          <button className="logout-btn" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
