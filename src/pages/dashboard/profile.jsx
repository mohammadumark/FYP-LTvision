import React, { useState, useEffect } from 'react';
import { Input, Button, Typography, Select, Option } from "@material-tailwind/react";

export function Profile() {
  // State for storing profile data
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    bloodGroup: '',
    hospitalName: '',
    password: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fetch profile data when component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token
          },
        });
        const data = await response.json();
        if (response.ok) {
          setProfileData({
            username: data.username,
            email: data.email,
            phoneNumber: data.phoneNumber,
            bloodGroup: data.bloodGroup,
            hospitalName: data.hospitalName,
          });
        } else {
          console.error('Error fetching profile data:', data.error);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSelectChange = (value) => {
    setProfileData({ ...profileData, bloodGroup: value });
  };

  // Handle form submission to update profile data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/profile', { // Adjust endpoint accordingly
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        setIsEditing(false); // Exit edit mode
        console.log('Profile updated successfully');
      } else {
        const errorData = await response.json();
        console.error('Failed to update profile:', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" className="mb-4">
        Profile Information
      </Typography>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Name */}
        <Input
          size="lg"
          label="Name"
          name="username"
          value={profileData.username}
          onChange={handleChange}
          disabled={!isEditing}
        />

        {/* Email */}
        <Input
          size="lg"
          label="Email"
          name="email"
          value={profileData.email}
          onChange={handleChange}
          disabled={!isEditing}
        />

        {/* Phone */}
        <Input
          size="lg"
          label="Phone No"
          name="phoneNumber"
          value={profileData.phoneNumber}
          onChange={handleChange}
          disabled={!isEditing}
        />

        {/* Blood Group */}
        <Select
          label="Blood Group"
          size="lg"
          value={profileData.bloodGroup}
          onChange={handleSelectChange}
          disabled={!isEditing}
        >
          <Option value="O+">O+</Option>
          <Option value="O-">O-</Option>
          <Option value="A+">A+</Option>
          <Option value="A-">A-</Option>
          <Option value="B+">B+</Option>
          <Option value="B-">B-</Option>
          <Option value="AB+">AB+</Option>
          <Option value="AB-">AB-</Option>
        </Select>

        {/* Hospital */}
        <Input
          size="lg"
          label="Hospital Name"
          name="hospitalName"
          value={profileData.hospitalName}
          onChange={handleChange}
          disabled={!isEditing}
        />

        {/* Password */}
        {isEditing && (
          <Input
            size="lg"
            type="password"
            label="Password"
            name="password"
            value={profileData.password}
            onChange={handleChange}
          />
        )}

        {/* Edit and Save buttons */}
        <div className="flex justify-between mt-4">
          {isEditing ? (
            <>
              <Button type="submit">Save</Button>
              <Button variant="outlined" onClick={() => setIsEditing(false)}>Cancel</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Profile;
