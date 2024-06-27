import http from 'http';
import app from './app';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors"

const URI: string | undefined = process.env.MONGO_URI;
const PORT: string | undefined = process.env.PORT;
const corsOptions = {
  origin: 'http://codeinterview.s3-website.ap-south-1.amazonaws.com',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));


const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions
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
