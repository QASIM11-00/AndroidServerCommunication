const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle events from clients
    socket.on('analytics', (data) => {
        // Handle analytics data here
        console.log('Analytics data received:', data);

        // Broadcast the analytics data to all connected clients
        io.emit('analytics', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
