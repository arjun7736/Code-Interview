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

//<=.................Delete an Interviewee...........=>//
export const deleteInterviewee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {id}=req.body
    await IntervieweeDB.findByIdAndDelete(id)
    res.json({message:"Deleted SuccessFully"})
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
//<=.................Delete an Company...........=>//

//<=.................Block an Interviewer...........=>//
export const blockInterviewer=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
  try {
    const {id}=req.body
   const blocked:IInterviewer|null = await InterviewerDB.findOneAndUpdate({_id:id},{$set:{isBlocked:true}},{new:true})
   res.json(blocked)
  } catch (error) {
    next(error)
  }
}

//<=.................Block an Interviewee...........=>//
export const blockInterviewee =async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
  try {
    const {id}= req.body
    const blocked:IInterviewee | null =await IntervieweeDB.findOneAndUpdate({_id:id},{$set:{isBlocked:true}},{new:true})
    res.json(blocked)
  } catch (error) {
    next(error)
  }
}
