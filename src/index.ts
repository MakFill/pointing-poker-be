require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';

const LOG_LEVEL = process.env.LOG_LEVEL as string;

const PORT = process.env.PORT;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Express');
});

app.use(morgan(LOG_LEVEL));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET'],
  },
});

io.on('connection', (socket) => {
  socket.broadcast.emit('message', `A user ${socket.id} connected`);

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `A user ${socket.id} disconnected`);
  });
});

server.listen(PORT, () => console.log(`Socket-server started at localhost:${PORT}`));
