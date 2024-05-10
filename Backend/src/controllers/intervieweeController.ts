import { Request, Response } from "express";
import { ErrorResponse } from "../interfaces/errorInterface";
import { updateIntervieweeService } from "../services/intervieweeService";
import { errorResponse } from "../utils/error";
import { clearPassword } from "../services/authServices";

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const id = req?.user._id;
    const { name, profilePicture } = req.body;

    const updatedInterviewee = await updateIntervieweeService(
      id,
      name,
      profilePicture
    );
    if (!updatedInterviewee) {
      throw errorResponse(500, "Error in Update Profile ");
    }
    const intervieweeWithoutPassword = clearPassword(updatedInterviewee);
    res.json(intervieweeWithoutPassword);
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || 500;
    res.status(statusCode).send(customError.message);
  }
};
