import http from 'http';
import app from './app';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const URI: string | undefined = process.env.MONGO_URI;
const PORT: string | undefined = process.env.PORT;

console.log(URI,PORT)

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT',"PATCH", 'DELETE'], 
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('send_message', (message) => {
    console.log('Message received:', message);
    io.emit('receive_message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

if (URI) {
  mongoose
    .connect(URI)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));
} else {
  console.log("not Connected");
}

if (PORT) {
  server.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
} else {
  console.log("Error Occured");
}
