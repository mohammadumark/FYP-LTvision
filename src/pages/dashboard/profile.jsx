import React, { useState, useEffect } from 'react';
import { Input, Button, Typography, Select, Option, Textarea, Switch } from "@material-tailwind/react";

export function Profile() {
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    bloodGroup: '',
    hospitalName: '',
    password: '',
    specialty: '',
    description: '',
    isAvailable: false,
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
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
            specialty: data.specialty || '',
            description: data.description || '',
            isAvailable: data.isAvailable || false,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSelectChange = (value) => {
    setProfileData({ ...profileData, bloodGroup: value });
  };

  const handleAvailabilityToggle = () => {
    setProfileData((prevData) => ({
      ...prevData,
      isAvailable: !prevData.isAvailable,
    }));
  };
  

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        console.log('Profile updated successfully');
        setIsEditing(false); // Exit editing mode
      } else {
        const errorData = await response.json();
        console.error('Failed to update profile:', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-40">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxapDwCeVLL0T69nhwV_BgqH9lztNDYQGhCbUVKHMgITKzGDlPsa55HS-6dqUdC8Qt5VU&usqp=CAU"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
          <Typography variant="h5" className="mt-4">
            {profileData.username || 'N/A'}
          </Typography>
          <Typography className="text-gray-600">{profileData.specialty || 'Specialty not set'}</Typography>
        </div>

        <form className="space-y-6">


          {/* Availability Switch */}
          <div className="flex items-center">
            <Typography variant="h6" className="mr-4">
              Availability
            </Typography>
            <Switch
              label={profileData.isAvailable ? 'Available' : 'Not Available'}
              checked={profileData.isAvailable}
              onChange={handleAvailabilityToggle}
              disabled={!isEditing}
            />
          </div>



          {/* Description Section */}
          <div>
            <Typography variant="h6">Description</Typography>
            <Textarea
              label="Description"
              name="description"
              value={profileData.description}
              onChange={handleChange}
              rows={4}
              disabled={!isEditing}
            />
          </div>

          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Typography variant="h6">Name</Typography>
              <Input
                size="lg"
                label="Name"
                name="username"
                value={profileData.username}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Typography variant="h6">Email</Typography>
              <Input
                size="lg"
                label="Email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Phone Number and Blood Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Typography variant="h6">Phone No</Typography>
              <Input
                size="lg"
                label="Phone No"
                name="phoneNumber"
                value={profileData.phoneNumber}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Typography variant="h6">Blood Group</Typography>
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
            </div>
          </div>

          {/* Specialty and Hospital Name */}
          <div>
            <Typography variant="h6">Specialty</Typography>
            <Input
              size="lg"
              label="Specialty"
              name="specialty"
              value={profileData.specialty}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Typography variant="h6">Hospital Name</Typography>
            <Input
              size="lg"
              label="Hospital Name"
              name="hospitalName"
              value={profileData.hospitalName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Password Field (Visible only when editing) */}
          {isEditing && (
            <div>
              <Typography variant="h6">Password</Typography>
              <Input
                size="lg"
                type="password"
                label="Password"
                name="password"
                value={profileData.password}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex justify-center mt-4">
            {isEditing ? (
              <>
                <Button onClick={handleSubmit}>Update</Button>
                <Button
                  variant="outlined"
                  onClick={() => setIsEditing(false)}
                  className="ml-4"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
