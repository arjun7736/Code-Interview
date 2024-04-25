import { Request, Response, NextFunction } from "express";
import CompanyDB, { ICompany } from "../models/companyModel";
import InterviewerDB, { IInterviewer } from "../models/interviewerModel";
import IntervieweeDB, { IInterviewee } from "../models/intervieweeModel";
import { Model } from "mongoose";
import { errorHandler } from "../utils/error";




//<=.................Getdata...........=>//
export const getData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { role } = req.query;

    let userCollection: Model<any> | null = null;
    switch (role) {
      case "interviewer":
        userCollection = InterviewerDB;
        break;
      case "interviewee":
        userCollection = IntervieweeDB;
        break;
      case "company":
        userCollection = CompanyDB;
        break;
    }
    if (!userCollection) {
      return next(errorHandler(500, "User collection is not defined"));
    }

   const data = await userCollection.find()
    res.json(data);
  } catch (error) {
    next(error);
  }
};

//<=.................Block ...........=>//

export const block = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, role } = req.body;

    let userCollection: Model<any> | null = null;
    switch (role) {
      case "interviewer":
        userCollection = InterviewerDB;
        break;
      case "interviewee":
        userCollection = IntervieweeDB;
        break;
      case "company":
        userCollection = CompanyDB;
        break;
    }
    if (!userCollection) {
      return next(errorHandler(500, "User collection is not defined"));
    }
    await userCollection.findOneAndUpdate(
      { _id: id },
      { $set: { isBlocked: true } },
      { new: true }
    );
    res.json({ message: " Blocked" });
  } catch (error) {
    next(error);
  }
};

//<=.................unBlock ...........=>//
export const unBlock = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, role } = req.body;

    let userCollection: Model<any> | null = null;
    switch (role) {
      case "interviewer":
        userCollection = InterviewerDB;
        break;
      case "interviewee":
        userCollection = IntervieweeDB;
        break;
      case "company":
        userCollection = CompanyDB;
        break;
    }
    if (!userCollection) {
      return next(errorHandler(500, "User collection is not defined"));
    }

    await userCollection.findOneAndUpdate(
      { _id: id },
      { $set: { isBlocked: false } },
      { new: true }
    );

    res.json({ message: " Unblocked " });
  } catch (error) {
    next(error);
  }
};

//<=..............count of Premium Companies ..............=>//
export const PremiumCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const premiumCompanies: ICompany[] | null = await CompanyDB.find({
      isPremium: true,
    });
    res.json(premiumCompanies);
  } catch (error) {
    next(error);
  }
};
