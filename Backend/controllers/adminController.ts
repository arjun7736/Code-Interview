import { Request, Response, NextFunction } from "express";
import CompanyDB, { ICompany } from "../models/companyModel";
import InterviewerDB from "../models/interviewerModel";
import IntervieweeDB from "../models/intervieweeModel";
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

    const data = await userCollection.find().sort({ _id: -1 });
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

//<=..............search..............=>//
export const search = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {query} =req.params

    const interviewerResults = await InterviewerDB.aggregate([
      { $match: { $or: [{ name: { $regex: query, $options: 'i' } }, { email: { $regex: query, $options: 'i' } }] } }
    ]);

    const intervieweeResults = await IntervieweeDB.aggregate([
      { $match: { $or: [{ name: { $regex: query, $options: 'i' } }, { email: { $regex: query, $options: 'i' } }] } }
    ]);

    const companyResults = await CompanyDB.aggregate([
      { $match: { $or: [{ name: { $regex: query, $options: 'i' } }, { email: { $regex: query, $options: 'i' } }] } }
    ]);

    const removePassword = (data: any[]) => {
      return data.map(doc => {
        const docWithoutPassword = { ...doc };
        delete docWithoutPassword.password;
        return docWithoutPassword;
      });
    };

    const interviewerResultsWithoutPassword = removePassword(interviewerResults);
    const intervieweeResultsWithoutPassword = removePassword(intervieweeResults);
    const companyResultsWithoutPassword = removePassword(companyResults);

    const combinedResults = interviewerResultsWithoutPassword
    .concat(intervieweeResultsWithoutPassword, companyResultsWithoutPassword);

    res.json(combinedResults)
  } catch (error) {
    next(error)
  }
};
