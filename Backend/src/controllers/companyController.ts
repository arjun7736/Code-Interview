import { Request, Response } from "express";
import { errorResponse } from "../utils/error";
import { ErrorResponse } from "../interfaces/errorInterface";
import {
  addInterviewerService,
  buyPremiumService,
  deleteInterviewerService,
  editInterviewerService,
  listInterviewersService,
  updateProfileService,
} from "../services/companyService";
import { clearPassword } from "../services/authServices";

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
    const statusCode = customError.statusCode || 500;
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
    const statusCode = customError.statusCode || 500;
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
    const statusCode = customError.statusCode || 500;
    res.status(statusCode).send(customError.message);
  }
};

//<=------------------------Edit Interviewer--------------------------=>//

export const editInterviewer = async (req: Request, res: Response) => {
  try {
    const { password, name, id } = req.body;
    const updatedInterviewer = await editInterviewerService(id, name, password);

    if (!updatedInterviewer) {
      throw errorResponse(500, "Error While Update Interviewer");
    }
    const interviewerWithoutPassword = clearPassword(updatedInterviewer);

    res.json({
      message: "Interviewer Updated Successfully",
      interviewerWithoutPassword,
    });
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || 500;
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
    const statusCode = customError.statusCode || 500;
    res.status(statusCode).send(customError.message);
  }
};

//<=------------------------Update Company Profle--------------------------=>//
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const id = req?.user._id;
    const { name, profilePicture } = req.body;
    const updatedCompany = await updateProfileService(id, name, profilePicture);

    if (!updatedCompany) {
      throw errorResponse(500, "Error in Update Profile");
    }
    const companyWithoutPassword = clearPassword(updatedCompany);
    res.json(companyWithoutPassword);
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || 500;
    res.status(statusCode).send(customError.message);
  }
};
