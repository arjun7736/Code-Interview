import { Request, Response } from "express";
import { ErrorResponse } from "../interfaces/errorInterface";
import {
  addQuestions,
  deleteQuestionService,
  getInterviewerQuestions,
  setMeetingLinkService,
  updateInterviewerService,
  updateQuestionService,
} from "../services/interviewerService";
import { errorResponse } from "../utils/error";
import { clearPassword } from "../services/authServices";
import { StatusCode } from "../utils/selectDB";

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const id = req?.params.id;
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
    const { questions,questionSet } = req.body;
    const id = req?.params.id;
    const data = await addQuestions(questions, id,questionSet);
    res.json(data);
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const id = req?.params.id;
    const questions = await getInterviewerQuestions(id);
    res.json(questions);
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

export const setMeetingLink = async (req: Request, res: Response) => {
  try {
    const { link, questionSet } = req.body;
    const meetingLink = await setMeetingLinkService(link, questionSet);
    if (meetingLink) {
      res.json({ Message: "Success" });
    } else {
      res.json({ Message: "Failed" });
    }
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await deleteQuestionService(id);
    res.json(deleted);
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

export const updateQuestionSet = async(req: Request, res: Response) => {
  try {
    const{question,options,rightOption,id}=req.body
    const updatedData = await updateQuestionService(question,options,rightOption,id)
    res.json(updatedData)
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};


