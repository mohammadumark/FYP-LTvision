import React from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import "./AllChatsList.css";

const AllChatsList = ({ chats, onChatSelect }) => {
  return (
    <List>
      {chats.map((chat) => (
        <ListItem button key={chat.id} onClick={() => onChatSelect(chat)}>
          <ListItemAvatar>
            <Avatar alt={chat.name} src={chat.profileImage} />
          </ListItemAvatar>
          <ListItemText
            primary={chat.name}
            secondary={
              <>
                <Typography component="span" variant="body2" color="textPrimary">
                  {chat.lastMessage}
                </Typography>
                <Typography component="span" variant="body2" color="textSecondary">
                  {chat.date}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default AllChatsList;
