import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute";
import adminRoute from "./routes/adminRoute";





const URI: string | undefined = process.env.MONGO_URI;
const PORT: string | undefined = process.env.PORT;



const app = express();
app.use(express.json());
app.use(cookieParser());




app.use("/api/auth",authRoute)
app.use("/api/admin",adminRoute)






app.use((err: Error & { statuscode?: number },req: Request,res: Response,next: NextFunction) => {
    const statusCode = err.statuscode || 500;
    const errorMEssage = err.message || "Internal Server Error";
    return res.status(statusCode).json({
      success: false,
      message: errorMEssage,
      statusCode
    });
  }
);




if (URI) {
  mongoose
    .connect(URI)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));
} else {
  console.log("not Connected");
}
if (PORT) {
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
}
