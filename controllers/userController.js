const User = require('../models/userModel');

// Fetch all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Add a new user
exports.addUser = async (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }
    try {
        const newUser = await User.create({ username });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add user' });
    }
};
