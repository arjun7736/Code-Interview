import express, { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const URI: string | undefined = process.env.MONGO_URI;
const PORT :string | undefined  = process.env.PORT

const app = express();
app.use(express.json());
app.use(cookieParser());



if (URI) {
  mongoose
    .connect(URI)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));
} else {
  console.log("not Connected");
}
if(PORT){
  app.listen(PORT,()=>{
      console.log("Server is running on port "+PORT);
  })
}