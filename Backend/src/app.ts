import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute";
import AdminRouter from "./routes/adminRoute"
import companyRoute from "./routes/companyRoute";
import interviewerRoute from "./routes/interviewerRoute";
import intervieweeRoute from "./routes/intervieweeRoute";
import morgan from "morgan";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

const adminRouter = new AdminRouter();

app.use("/api/auth", authRoute);
app.use("/api/admin", adminRouter.getRouter());
app.use("/api/company", companyRoute);
app.use("/api/interviewer", interviewerRoute);
app.use("/api/interviewee", intervieweeRoute);

export default app;
