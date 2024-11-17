"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const server = (0, http_1.createServer)();
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST']
    }
});
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    // Emit a welcome message to the connected client
    socket.emit('message', 'Welcome to the server!', socket.id);
    // Broadcast a message to all other clients when a user connects
    socket.broadcast.emit('message', 'A new user has joined!', socket.id);
    // Handle incoming messages from the client
    socket.on('message', (data) => {
        io.emit('message', data);
    });
    // Handle client disconnect
    socket.on('disconnect', (reason) => {
        console.log(`Client disconnected: ${socket.id}, Reason: ${reason}`);
        io.emit('message', `User ${socket.id} has disconnected.`);
    });
});
server.listen(4000, () => {
    console.log('Server started on PORT', 4000);
});
