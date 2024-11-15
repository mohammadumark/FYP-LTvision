const express = require('express');
const Chat = require('../models/Chat');
const authenticateToken = require('./auth').authenticateToken; // Adjust as needed for auth middleware

const router = express.Router();

// Send a message
router.post('/send', authenticateToken, async (req, res) => {
  const { receiverId, message } = req.body;
  const senderId = req.user.id;

  try {
    const chatMessage = new Chat({ senderId, receiverId, message });
    await chatMessage.save();
    res.status(201).json({ chatMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get chat messages between two users
router.get('/messages/:receiverId', authenticateToken, async (req, res) => {
  const senderId = req.user.id;
  const receiverId = req.params.receiverId;

  try {
    const messages = await Chat.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ timestamp: 1 });

    res.json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
