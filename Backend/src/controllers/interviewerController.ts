import { Request, Response } from "express";
import { ErrorResponse } from "../interfaces/errorInterface";
import {
  addQuestions,
  getInterviewerQuestions,
  updateInterviewerService,
} from "../services/interviewerService";
import { errorResponse } from "../utils/error";
import { clearPassword } from "../services/authServices";
import { StatusCode } from "../utils/selectDB";
import { IQuestion } from "../interfaces/modelInterface";

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
      throw errorResponse(StatusCode.SERVER_ERROR, "Error In Update Profile");
    }
    const companyWithoutPassword = clearPassword(updatedInterviewer);
    res.json(companyWithoutPassword);
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

export const addQuestion = async (req: Request, res: Response) => {
  try {
    const { questions } = req.body;
    const id = req?.user._id;
    const data = await addQuestions(questions, id);
    res.json(data);
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const id = req?.user._id;
    const questions= await getInterviewerQuestions(id);
    res.json(questions)
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};
