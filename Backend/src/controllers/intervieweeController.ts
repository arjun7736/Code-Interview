import { Request, Response } from "express";
import { ErrorResponse } from "../interfaces/errorInterface";
import { fetchQuestions, getMeetingLinkService, getQuestionSetService, updateIntervieweeService, updateQuestionSetService } from "../services/intervieweeService";
import { errorResponse } from "../utils/error";
import { clearPassword } from "../services/authServices";
import { StatusCode } from "../utils/selectDB";

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const id = req?.params.id;
    const { name, profilePicture } = req.body;

    const updatedInterviewee = await updateIntervieweeService(
      id,
      name,
      profilePicture
    );
    if (!updatedInterviewee) {
      throw errorResponse(StatusCode.SERVER_ERROR, "Error in Update Profile ");
    }
    const intervieweeWithoutPassword = clearPassword(updatedInterviewee);
    res.json(intervieweeWithoutPassword);
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

export const getQAQuestions = async (req: Request, res: Response) => {
  try {
    const {id}= req.params
   const data= await fetchQuestions(id);
   res.json(data)
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

export const getQuestionSet=async(req:Request,res:Response)=>{
  try {
    const link=req.params.link
    const meetingLink = await getQuestionSetService(link)
    res.json(meetingLink)
  } catch (error:unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
}

export const getMeetingLink =async(req:Request,res:Response)=>{
  try {
    const id =req.params.id
    const link = await getMeetingLinkService(id)
    res.json(link)
  } catch (error:unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
}

export const updateQuestionSet=async (req:Request,res:Response)=>{
  try {
    const{interviewee,result,questionSet}=req.body
   const data= await updateQuestionSetService(interviewee,result,questionSet)
    res.json(data)
  } catch (error:unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
}