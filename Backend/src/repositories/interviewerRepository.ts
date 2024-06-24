/* eslint-disable camelcase */
import { IInterviewer, IQuestion } from "../interfaces/modelInterface";
import InterviewerDB from "../models/interviewerModel";
import QuestionDB from "../models/questionModel";
import LinkDB from "../models/linkModel";
import mongoose from "mongoose";
import { ErrorResponse } from "@/interfaces/errorInterface";
import { StatusCode } from "../utils/selectDB";
import { errorResponse } from "../utils/error";

export async function createInterviewer(
  email: string,
  password: string,
  company: string | mongoose.Types.ObjectId | undefined,
  role: string
): Promise<IInterviewer | null> {
  try {
    return await InterviewerDB.create({
      email,
      password,
      company,
      role,
    });
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While create Interviewer"); 
  }
}

export async function findUserByEmail(
  email: string
): Promise<IInterviewer | null> {
  try {
    return await InterviewerDB.findOne({ email: email });
    
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Find Interviewer "); 
  }
}

export async function findByIdAndDelete(id: string) {
  try {
    return await InterviewerDB.findByIdAndDelete({ _id: id });
    
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While delete Interviewer"); 
  }
}

export async function updateInterviewer(
  id: string,
  name?: string,
  password?: string
): Promise<IInterviewer | null> {
  try {
    return InterviewerDB.findByIdAndUpdate(
      { _id: id },
      { $set: { password: password, name: name } },
      { new: true }
    );
    
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While update Interviewer"); 
  }
}

export async function updateinterviewerProfile(
  id: string,
  name?: string,
  profile_picture?: string
): Promise<IInterviewer | null> {
  try {
    return InterviewerDB.findByIdAndUpdate(
      { _id: id },
      { $set: { name: name, profile_picture: profile_picture } }
    );
    
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Update Profile"); 
  }
}

export async function addNewQuestionSet(
  questions: IQuestion[],
  id: string,
  questionSet: number
) {
  try {
    return await QuestionDB.create({ questionSet, questions, author: id });
    
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While add New Questionset"); 
  }
}

export const countDocuments = async () => {
  try {
    return await QuestionDB.countDocuments();
    
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While get Question Count"); 
  }
};

export const getIndividualQuestions = async (id: string) => {
  try {
    return await QuestionDB.find({ author: id }).exec();
    
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Find Interviewers Question"); 
  }
};

export const setLink = async (link: string, questionSet: string) => {
  try {
    return await LinkDB.create({ meetingLink: link, questionSet: questionSet });
    
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While set Link"); 
  }
};
export const deleteQuestionById = async (id: string) => {
  try {
    return await QuestionDB.findByIdAndDelete(id);
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Delete Question"); 
  }
};
export const removeQuestionFromArray = async (id: string) => {
  try {
    return await QuestionDB.updateOne(
      { "questions._id": id },
      { $pull: { questions: { _id: id } } }
    );
    
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Update Question"); 
  }
};

export const updateQuestion = async (
  question: string,
  options: string[],
  rightOption: string,
  id: string
) => {
  try {
     const iD = new mongoose.Types.ObjectId(id);
     return await QuestionDB.findOneAndUpdate(
       { "questions._id": iD },
       {
         $set: {
           "questions.$.question": question,
           "questions.$.options": options,
           "questions.$.rightOption": rightOption,
         },
       },
       { new: true }
     );
    
   } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While update QuestionSet"); 
   }
};

export const addToQuestionSet= async(questions: IQuestion[], id: string, questionNum: number)=>{
  try {
  return  await QuestionDB.findOneAndUpdate({questionSet:questionNum},{$push:{questions:questions}},{new:true})
  
} catch (error) {
  const customError = error as ErrorResponse;
  const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
  throw errorResponse(statusCode, "Error While update Question"); 
}
}

export const findByQuestionId=async(id:string)=>{
  try {
    return await QuestionDB.findOne({questionSet:id})
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Find Questions"); 
  }
}