import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../utils/error";
import { isEmail, isStrongPassword } from "../utils/validator";
import InterviewerDB, { IInterviewer } from "../models/interviewerModel";
import bcrypt from "bcrypt";
import { sentOTP } from "../utils/otp";
import OTPDB from "../models/otpModel";
import CompanyDB from "../models/companyModel";
import mongoose from "mongoose";

//<=-----------------------Interviewer add---------------------------=>//

export const addInterviewer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, userId } = req.body;

    if (!email || !password)
      return next(errorHandler(400, "Fill all the Feild"));

    if (!isEmail(email)) return next(errorHandler(401, "Enter a Valied Email"));

    if (!isStrongPassword(password))
      return next(errorHandler(401, "Weak Password"));

    const isExist: IInterviewer | null = await InterviewerDB.findOne({
      email: email,
    });

    if (isExist) return next(errorHandler(404, "Interviewer already Exist"));

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const otp: number = Math.floor(100000 + Math.random() * 900000);
    sentOTP(email, otp);

    await OTPDB.create({
      email: email,
      otp: otp,
      password: hashedPassword,
      company: userId,
    });
    res.json({ email, userType: "interviewer" });
  } catch (error) {
    next(error);
  }
};

//<=------------------------Delete Interviewer--------------------------=>//
export const deleteInterviewer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await InterviewerDB.findByIdAndDelete({ _id: id });
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

//<=------------------------List Interviewers--------------------------=>//
export const listInterviewers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { Id } = req.query;
    const objectId = new mongoose.Types.ObjectId(Id as string);

    const pipeline = [
      {
        $match: {
          _id: objectId,
        },
      },
      {
        $lookup: {
          from: "interviewers",
          localField: "_id",
          foreignField: "company",
          as: "interviewers",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          interviewers: {
            $map: {
              input: "$interviewers",
              as: "interviewer",
              in: {
                _id: "$$interviewer._id",
                email: "$$interviewer.email",
                name:"$$interviewer.name"
              },
            },
          },
        },
      },
    ];

    const data = await CompanyDB.aggregate(pipeline);

    res.json(data);
  } catch (error) {
    next(error);
  }
};

//<=------------------------Edit Interviewer--------------------------=>//
export const editInterviewer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, name, id } = req.body;
    
    if (!password || !name)
      return next(errorHandler(400, "password and Name Required"));
    let isStrongPass = isStrongPassword(password);

    if (!isStrongPass) return next(errorHandler(401, "Weak Password"));

    const hpass =await bcrypt.hash(password, 10);

    const interviewer: IInterviewer | null =
      await InterviewerDB.findByIdAndUpdate(
        { _id: id },
        { $set: { password: hpass, name: name } },
        { new: true }
      );

    if (interviewer) {
      const interviewerWithoutPassword = { ...interviewer.toObject() };
      delete interviewerWithoutPassword.password;
      res.json({ message: "Interviewer Updated Successfully ",interviewerWithoutPassword });
    }
  } catch (error) {
    next(error);
  }
};
