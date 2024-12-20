import React from 'react';
import './ProfileSidebar.css';

const ProfileSidebar = ({ profile }) => {
  return (
    <div className="profile-sidebar">
      <button className="close-btn">X</button>
      <img src={profile.image} alt={profile.name} className="profile-image" />
      <h2>{profile.name}</h2>
      <p>{profile.email}</p>
      <p>{profile.phone}</p>
    </div>
  );
};

export default ProfileSidebar;
