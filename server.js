const express = require('express'); // Import express
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 5000;

// Serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));

// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Socket.io logic
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('send name', (username) => {
        io.emit('send name', username);
    });

    socket.on('send message', (chat) => {
        io.emit('send message', chat);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
