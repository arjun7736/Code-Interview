import { Request, Response, NextFunction } from "express";
import CompanyDB, { ICompany } from "../models/companyModel";
import InterviewerDB, { IInterviewer } from "../models/interviewerModel";
import IntervieweeDB, { IInterviewee } from "../models/intervieweeModel";

//<=..................get Company Deatils..................=>//
export const getComapnyData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const companyData: ICompany[] | null = await CompanyDB.find();
    res.json(companyData);
  } catch (error) {
    next(error);
  }
};

//<=..................get Interviewers Deatils..................=>//
export const getInterviewersData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const interviewers: IInterviewer[] | null = await InterviewerDB.find();
    res.json(interviewers);
  } catch (error) {
    next(error);
  }
};
//<=.................Get Interviewee data...........=>//
export const getItervieweeData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const Interviewees: IInterviewee[] | null = await IntervieweeDB.find();
    res.json(Interviewees);
  } catch (error) {
    next(error);
  }
};


//<=.................Block an Interviewer...........=>//
export const blockInterviewer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.body;
    const blocked: IInterviewer | null = await InterviewerDB.findOneAndUpdate(
      { _id: id },
      { $set: { isBlocked: true } },
      { new: true }
    );
    res.json({message:"interviewer Blocked"});
  } catch (error) {
    next(error);
  }
};

//<=.................Block an Interviewee...........=>//
export const blockInterviewee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.body;
    const blocked: IInterviewee | null = await IntervieweeDB.findOneAndUpdate(
      { _id: id },
      { $set: { isBlocked: true } },
      { new: true }
    );
    res.json({message:"Interviewee Blocked"});
  } catch (error) {
    next(error);
  }
};

//<=.................Block an Company...........=>//
export const blockCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.body;
    const company: ICompany | null = await CompanyDB.findOneAndUpdate(
      { _id: id },
      { $set: { isBlocked: true } },
      { new: true }
    );
    res.json({message:"Company Blocked"});
  } catch (error) {
    next(error);
  }
};

//<=.................UnBlock an Company...........=>//
export const unBlockCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.body;
    const company: ICompany | null = await CompanyDB.findOneAndUpdate(
      { _id: id },
      { $set: { isBlocked: false } },
      { new: true }
    );
    res.json({message:"Company Unblocked Successfully"});
  } catch (error) {
    next(error);
  }
};

//<=.................unBlock an Interviewee...........=>//
export const unBlockInterviewee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.body;
    const blocked: IInterviewee | null = await IntervieweeDB.findOneAndUpdate(
      { _id: id },
      { $set: { isBlocked: false } },
      { new: true }
    );
    res.json({message:"Interviewee Unblocked Successfully"});
  } catch (error) {
    next(error);
  }
};

//<=.................unBlock an Interviewer...........=>//
export const unBlockInterviewer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.body;
    const blocked: IInterviewer | null = await InterviewerDB.findOneAndUpdate(
      { _id: id },
      { $set: { isBlocked: false } },
      { new: true }
    );
    res.json({message:"InterviewerUnblocked Successfully"});
  } catch (error) {
    next(error);
  }
};