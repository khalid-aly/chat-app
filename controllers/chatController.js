const Chat = require('../models/chatModel');

// Fetch all chat messages
exports.getMessages = async (req, res) => {
    try {
        const messages = await Chat.find().sort({ timestamp: 1 }); // Sort by timestamp
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

// Add a new chat message
exports.addMessage = async (req, res) => {
    const { username, message } = req.body;
    if (!username || !message) {
        return res.status(400).json({ error: 'Username and message are required' });
    }
    try {
        const newMessage = await Chat.create({ username, message });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save message' });
    }
};
