const express = require('express');
const connectDB = require('./config/db');
const chatRoutes = require('./routes/chatRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/messages', chatRoutes);
app.use('/api/users', userRoutes);

// Serve static files and main view
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

module.exports = app;
