import { Request, Response, NextFunction } from "express";
import CompanyDB, { ICompany } from "../models/companyModel";
import InterviewerDB, { IInterviewer } from "../models/interviewerModel";

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

//<=.................Delete an Interviewer...........=>//
export const deleteInterviewer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.body;
    await InterviewerDB.findByIdAndDelete(id);
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

//<=..............Delete Company..............=>//
// export const deleteCompany = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const { id } = req.body;
//     const comapny: ICompany[] | null = await CompanyDB.findOne({ _id: id });

//   } catch (error) {
//     next(error);
//   }
// };
