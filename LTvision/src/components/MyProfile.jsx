import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';

import Navigation from './Navigation';

import './MyProfile.css';

const MyProfile = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Ishaal",
    email: "ishaal@gmail.com",
    phoneNo: "03484890321",
    bloodGroup: "A+",
    hospital: "Shifa International Hospital, Islamabad",
    password: "........"
  });

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put('http://localhost:5000/update-profile', profileData);
      if (response.data.success) {
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile', error);
      alert('Error updating profile');
    }
    setIsEditing(false);
  };

  return (
    <div className="home-container-p">
      <Navigation selectedOption={selectedOption} handleOptionClick={handleOptionClick} />
      <div className="main-content-p">
        <div className="profile-container">
          <div className="profile-header">
            <img src="./src/assets/pro.png" alt="Profile" className="profile-image" />
            <h1>Dr. Ishaal</h1>
            <p>Hepatologist</p>
          </div>
          <div className="profile-content">
            <button className="edit-button" onClick={handleEditClick}>
              Edit Profile <FaEdit className="edit-icon" />
            </button>
            <form className="profile-form">
              {Object.keys(profileData).map((key) => (
                <div className="form-group" key={key}>
                  <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                  <input
                    type={key === "password" ? "password" : "text"}
                    name={key}
                    value={profileData[key]}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </div>
              ))}
              {isEditing && (
                <button type="button" className="save-button" onClick={handleSaveClick}>
                  Save
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
