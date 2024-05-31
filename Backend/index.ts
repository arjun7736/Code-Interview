import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./src/routes/authRoute";
import adminRoute from "./src/routes/adminRoute";
import companyRoute from "./src/routes/companyRoute";
import interviewerRoute from "./src/routes/interviewerRoute";
import intervieweeRoute from "./src/routes/intervieweeRoute";
import morgan from "morgan";
import cors from "cors";
import http from 'http';
import { Server } from 'socket.io';


const URI: string | undefined = process.env.MONGO_URI;
const PORT: string | undefined = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/company", companyRoute);
app.use("/api/interviewer", interviewerRoute);
app.use("/api/interviewee", intervieweeRoute);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
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
}else{
  console.log("Error Occured")
}
