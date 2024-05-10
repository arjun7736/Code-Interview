import { Request, Response } from "express";
import { ErrorResponse } from "../interfaces/errorInterface";
import { updateInterviewerService } from "../services/interviewerService";
import { errorResponse } from "../utils/error";
import { clearPassword } from "../services/authServices";

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const id = req?.user._id;
    const { name, profilePicture } = req.body;

    const updatedInterviewer = await updateInterviewerService(
      id,
      name,
      profilePicture
    );
    if (!updatedInterviewer) {
      throw errorResponse(500, "Error In Update Profile");
    }
    const companyWithoutPassword = clearPassword(updatedInterviewer);
    res.json(companyWithoutPassword);
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || 500;
    res.status(statusCode).send(customError.message);
  }
};
