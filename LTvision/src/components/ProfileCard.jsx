import React from 'react';
import { Avatar, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import './ProfileCard.css';

const ProfileCard = ({ chat }) => {
  return (
    <Box className="profile-card">
      <Box className="close-button">
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Box>
      <Avatar
        alt={chat.name}
        src={chat.profileImage}
        className="profile-avatar"
      />
      <Typography variant="h5" className="profile-name">{chat.name}</Typography>
      <Box className="contact-info">
        <Box className="contact-item">
          <PhoneIcon className="contact-icon" />
          <Typography variant="body1">kumara2@gmail.com</Typography>
        </Box>
        <Box className="contact-item">
          <EmailIcon className="contact-icon" />
          <Typography variant="body1">+92 3448890321</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileCard;
