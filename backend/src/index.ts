const express = require('express')
const { Server } = require('socket.io')
import { createServer } from 'http'

// Import the type for the socket
import { Socket } from 'socket.io'
const server = createServer()

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket: Socket) => {
  console.log(`Client connected: ${socket.id}`)

  // Emit a welcome message to the connected client
  socket.emit('message', 'Welcome to the server!', socket.id)

  // Broadcast a message to all other clients when a user connects
  socket.broadcast.emit('message', 'A new user has joined!', socket.id)

  // Handle incoming messages from the client
  socket.on('message', (data) => {
    io.emit('message', data)
  })

  // Handle client disconnect
  socket.on('disconnect', (reason) => {
    console.log(`Client disconnected: ${socket.id}, Reason: ${reason}`)
    io.emit('message', `User ${socket.id} has disconnected.`)
  })
})

server.listen(4000, () => {
  console.log('Server started on PORT', 4000)
})
