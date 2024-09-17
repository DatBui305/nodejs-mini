// index.js
import app from './app.js';
import './database.js';
import { PORT } from './config.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Create an HTTP server and attach Socket.IO to it
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins, adjust as necessary for security
    methods: ['GET', 'POST']
  }
});

// Attach the io instance to the app
app.set('io', io);

// Listen on the configured port
server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

export { io };
