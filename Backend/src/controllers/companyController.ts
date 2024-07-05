import { Request, Response } from "express";
import { errorResponse } from "../utils/error";
import { ErrorResponse } from "../interfaces/errorInterface";
import {
  addInterviewerService,
  buyPremiumService,
  deleteInterviewerService,
  editInterviewerService,
  getAllLinks,
  getInterviewDataService,
  listInterviewersService,
  sentLinkToEmail,
  updateProfileService,
} from "../services/companyService";
import { clearPassword } from "../services/authServices";
import { StatusCode } from "../utils/selectDB";

//<=-----------------------add Interviewer---------------------------=>//

export const addInterviewer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password, userId } = req.body;
    await addInterviewerService(email, password, userId);
    res.json({ email, role: "interviewer" });
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

//<=-----------------------Delete Interviewer---------------------------=>//

export const deleteInterviewer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteInterviewerService(id);
    res.json({ message: "Interviewer Deleted Successfully" });
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

//<=-----------------------List Interviewers---------------------------=>//
export const listInterviewers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.query.Id as string;
    const interviewers = await listInterviewersService(id);
    res.json(interviewers);
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

//<=------------------------Edit Interviewer--------------------------=>//

export const editInterviewer = async (req: Request, res: Response) => {
  try {
    const { password, name, id } = req.body;
    const updatedInterviewer = await editInterviewerService(id, name, password);

    if (!updatedInterviewer) {
      throw errorResponse(StatusCode.SERVER_ERROR, "Error While Update Interviewer");
    }
    const interviewerWithoutPassword = clearPassword(updatedInterviewer);

    res.json({
      message: "Interviewer Updated Successfully",
      interviewerWithoutPassword,
    });
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

//<=------------------------Buy Premium--------------------------=>//
export const buyPremium = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const session = await buyPremiumService(req.body.email, req.body._id);

    res.json({ sessionId: session });
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

//<=------------------------Update Company Profle--------------------------=>//
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const id = req?.params.id;
    const { name, profilePicture } = req.body;
    const updatedCompany = await updateProfileService(id, name, profilePicture);

    if (!updatedCompany) {
      throw errorResponse(StatusCode.SERVER_ERROR, "Error in Update Profile");
    }
    const companyWithoutPassword = clearPassword(updatedCompany);
    res.json(companyWithoutPassword);
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

//<=------------------------Create meeeting Link--------------------------=>//
export const createMeetingLink = (req: Request, res: Response) => {
  try {
    const { interviewerEmail, intervieweeEmail,date,time,id } = req.body;
    sentLinkToEmail(interviewerEmail, intervieweeEmail,date,time,id);
    res.json({ Message: "Email sent Successfully" });
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};


export const getInterviewData=async(req:Request,res:Response)=>{
  try {
    const {id}=req.params
    const data=await getInterviewDataService(id)
    res.json(data)
  } catch (error:unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
}
export const getCompanyMeetingLink=async(req:Request,res:Response)=>{
  try {
    const {id}=req.params
   const links = getAllLinks(id)
   res.json(links)
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
}