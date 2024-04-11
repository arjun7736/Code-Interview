import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../utils/error";
import { isEmail, isStrongPassword } from "../utils/validator";
import InterviewerDB, { IInterviewer } from "../models/interviewerModel";
import bcrypt from "bcrypt";
import { sentOTP } from "../utils/otp";
import OTPDB from "../models/otpModel";



//<=-----------------------Interviewer add---------------------------=>//


export const addInterviewer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, confirmpassword } = req.body;
    if (!email || !password)
      return next(errorHandler(400, "Fill all the Feild"));

    if (password != confirmpassword)
      return next(errorHandler(400, "Passwords Not Matching"));

    if (!isEmail(email)) return next(errorHandler(401, "Enter a Valied Email"));

    if (!isStrongPassword(password))
      return next(errorHandler(401, "Weak Password"));

    const isExist: IInterviewer | null = await InterviewerDB.findOne({
      email: email,
    });

    if (isExist) return next(errorHandler(404, "Interviewer already Exist"));

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const otp: number = Math.floor(1000 + Math.random() * 900000);
    sentOTP(email, otp);

    await OTPDB.create({
      email: email,
      otp: otp,
      passowrd: hashedPassword,
    });
    res.json({ email, userType: "Interviewer" });
  } catch (error) {
    next(error);
  }
};


//<=--------------------------------------------------=>//
