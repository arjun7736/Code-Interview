/* eslint-disable camelcase */

import { ErrorResponse } from "@/interfaces/errorInterface";
import { IInterviewee } from "../interfaces/modelInterface";
import IntervieweeDB from "../models/intervieweeModel";
import LinkDB from "../models/linkModel";
import QuestionDB from "../models/questionModel";
import { StatusCode } from "../utils/selectDB";
import { errorResponse } from "../utils/error";

export async function findInterviewee(
  email: string
): Promise<IInterviewee | null> {
  try {
    return await IntervieweeDB.findOne({ email: email });
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Find Interviewee"); 
  }
}

export async function createInterviewee(
  email: string,
  name: string,
  password: string,
  role?: string,
  profile_picture?: string
): Promise<IInterviewee | null> {
  try {
    return await IntervieweeDB.create({
      email,
      password,
      name,
      isBlocked: false,
      role,
      profile_picture,
    });
    
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Create Interviewee"); 
  }
}

export async function getUserByEmail(
  email: string
): Promise<IInterviewee | null> {
  try {
    return await IntervieweeDB.findOne({ email: email });
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Get Interviewer"); 
  }
}

export async function updateIntervieweePassword(
  email: string,
  password: string
): Promise<IInterviewee | null> {
  try {
    return await IntervieweeDB.findOneAndUpdate(
      { email: email },
      { password: password },
      { new: true }
    );
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While update Password"); 
  }
}

export async function updateIntervieweeProfile(
  id: string,
  name?: string,
  profile_picture?: string
): Promise<IInterviewee | null> {
  try {
    return IntervieweeDB.findByIdAndUpdate(
      { _id: id },
      { $set: { name: name, profile_picture: profile_picture } }
    );
    
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While update Profile"); 
  }
}

export const getQuestionsById = async (id: string) => {
  try {
    return await QuestionDB.findOne({ questionSet: id });
    
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Get Questions"); 
  }

};
export const getQuestionSet = async (link: string) => {
  try {
    return await LinkDB.findOne({ meetingLink: link });
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While get QUestionSet"); 
  }
};

export const getLinkById = async (id: string) => {
  try {
    return await LinkDB.findOne({ questionSet: id });
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Get Meeting Link"); 
  }
};

export const updateQuestionSetById = async (
  interviewee: string,
  result: string,
  questionSet: string
) => {
  try {
    return QuestionDB.findOneAndUpdate(
      { questionSet },
      {
        $push: {
          attentedInterviewees: {
            interviewee: interviewee,
            result: result,
          },
        },
      },
      { new: true, upsert: true }
    );
    
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While update QuestionSet"); 
  }
};
