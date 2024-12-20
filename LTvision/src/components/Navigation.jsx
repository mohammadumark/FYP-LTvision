import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navigation = ({ selectedOption, handleOptionClick }) => {
  const options = [
    { name: 'Dashboard', path: '/' },
    { name: 'My Profile', path: '/my-profile' },
    { name: 'Appointments', path: '/appointments' },
    { name: 'Patients', path: '/patients' },
    { name: 'Chats', path: '/chats' },
    { name: 'Alerts', path: '/alerts' },
  ];

  return (
    <div className="navigation-container">
      <h2>
        <img
          src="./src/assets/logo.png"
          alt="LtVision Logo"
          className="logo-icon"
        />
        LtVision
      </h2>
      {options.map(option => (
        <Link
          key={option.name}
          to={option.path}
          className={`nav-option ${selectedOption === option.name ? 'selected' : ''}`}
          onClick={() => handleOptionClick(option.name)}
        >
          <img
            src={`./src/assets/${option.name.toLowerCase().replace(' ', '-')}-icon.png`}
            alt={option.name}
            className="nav-icon"
          />
          {option.name}
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
