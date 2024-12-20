import React from 'react';
import { Avatar, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './ChatWindow.css';

const ChatWindow = ({ chat, messages, onProfileClick }) => {
  return (
    <Box className="chat-window">
      <Box className="chat-header">
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <Avatar alt={chat.name} src={chat.profileImage} onClick={onProfileClick} />
        <Box ml={2} onClick={onProfileClick} style={{ cursor: 'pointer' }}>
          <Typography variant="h6">{chat.name}</Typography>
          <Typography variant="body2" color="textSecondary">Active Now</Typography>
        </Box>
      </Box>
      <Box className="chat-messages">
        <Box className="chat-date">
          <Typography variant="caption">16 July 2024</Typography>
        </Box>
        {messages.map((msg) => (
          <Box key={msg.id} className={`message ${msg.sender === chat.name ? 'received' : 'sent'}`}>
            <Typography variant="body2" className="message-text">{msg.text}</Typography>
          </Box>
        ))}
      </Box>
      <Box className="chat-input">
        <TextField 
          variant="outlined"
          fullWidth
          placeholder="Type something..."
        />
        <Button variant="contained" color="primary">
          <Typography>Send</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default ChatWindow;
