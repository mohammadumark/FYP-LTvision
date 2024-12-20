import React, { useState } from 'react';
import Navigation from './Navigation';
import './Navbar.css';
import './chats.css';
import AllChatsList from './AllChatsList';
import ChatWindow from './ChatWindow';
import ProfileCard from './ProfileCard';

// Sample chat data
const chats = [
  { id: 1, name: 'Kumar', profileImage: 'path-to-profile-image.jpg', lastMessage: 'Drink water after 1 hour.', date: 'Dec 2' },
  { id: 2, name: 'Ali', profileImage: 'path-to-profile-image.jpg', lastMessage: 'Take medicine daily.', date: 'Dec 1' },
  { id: 3, name: 'Danish', profileImage: 'path-to-profile-image.jpg', lastMessage: 'Ok.', date: 'Jun 8' },
  { id: 4, name: 'Sarim', profileImage: 'path-to-profile-image.jpg', lastMessage: 'Hello Sir!', date: 'Apr 3' },
  { id: 5, name: 'Nasir', profileImage: 'path-to-profile-image.jpg', lastMessage: 'Reschedule again?', date: 'Jul 9' },
  { id: 6, name: 'Owais', profileImage: 'path-to-profile-image.jpg', lastMessage: 'Drink water after 1 hour.', date: 'Dec 2' },
  { id: 7, name: 'Kumar', profileImage: 'path-to-profile-image.jpg', lastMessage: 'Thanks', date: 'Sep 2' },
  { id: 8, name: 'Sarim', profileImage: 'path-to-profile-image.jpg', lastMessage: 'Hello Sir!', date: 'Apr 3' },
  { id: 9, name: 'Danish', profileImage: 'path-to-profile-image.jpg', lastMessage: 'Ok.', date: 'Jun 8' },
  { id: 10, name: 'Ali', profileImage: 'path-to-profile-image.jpg', lastMessage: 'Take medicine daily.', date: 'Dec 1' },
  // Add more chat objects as needed
];

// Sample messages data
const messages = [
  { id: 1, text: 'Hello, Dr!', sender: 'Kumar', timestamp: '16 July 2024' },
  { id: 2, text: 'Yes!', sender: 'Doctor', timestamp: '16 July 2024' },
  { id: 3, text: 'How can I help you?', sender: 'Doctor', timestamp: '16 July 2024' },
  { id: 4, text: 'What medicines will you recommend me?', sender: 'Kumar', timestamp: '16 July 2024' },
  { id: 5, text: 'Use simple panadol after every hour.', sender: 'Doctor', timestamp: '16 July 2024' },
  { id: 6, text: 'Drink water properly.', sender: 'Doctor', timestamp: '16 July 2024' },
  { id: 7, text: 'Thank you doctor!', sender: 'Kumar', timestamp: '16 July 2024' },
  // Add more messages as needed
];

const Chats = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleChatSelect = (chat) => {
    console.log("Chat selected:", chat);
    setSelectedChat(chat);
    setShowProfile(false);
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
    setShowProfile(true);
  };

  return (
    <div className="home-container-c">
      <Navigation selectedOption={null} handleOptionClick={() => {}} />
      <div className="main-content-c">
        <div className='all-chats'>
        <AllChatsList chats={chats} onChatSelect={handleChatSelect} />
        </div>
        {selectedChat && !showProfile && (
          <ChatWindow chat={selectedChat} messages={messages} onProfileClick={handleProfileClick} />
        )}
        {showProfile && selectedChat && <ProfileCard chat={selectedChat} />}
      </div>
    </div>
  );
};

export default Chats;
