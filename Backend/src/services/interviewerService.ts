import { ErrorResponse } from "@/interfaces/errorInterface";
import { IInterviewer, IQuestion } from "../interfaces/modelInterface";
import {
  addNewQuestionSet,
  addToQuestionSet,
  countDocuments,
  deleteQuestionById,
  getIndividualQuestions,
  removeQuestionFromArray,
  setLink,
  updateQuestion,
  updateinterviewerProfile,
} from "../repositories/interviewerRepository";
import { errorResponse } from "../utils/error";
import { StatusCode } from "../utils/selectDB";

export const updateInterviewerService = async (
  userId: string,
  name?: string,
  profilePicture?: string
): Promise<IInterviewer | null> => {
  try {
    if (!userId ) {
      throw errorResponse(
        StatusCode.BAD_REQUEST,
        "Missing required information (ID)"
      );
    }
    return await updateinterviewerProfile(userId, name, profilePicture);
    
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, customError.message ||"Error While Update Interviewer"); 
  }
};


export const addQuestions = async (
  questions: IQuestion[],
  id: string,
  questionNum: number | null
) => {
  try {
    if (questions.length === 0)
      throw errorResponse(StatusCode.BAD_REQUEST, "Cannot Add Empty Data");
    if (!questionNum) {
      const questionSet: number = await countDocuments();
      return await addNewQuestionSet(questions, id, questionSet + 1);
    } else {
      return await addToQuestionSet(questions, id, questionNum);
    }
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, customError.message ||"Error While add Questions"); 
  }
};


export const getInterviewerQuestions = async (id: string) => {
  try {
    if (!id) throw errorResponse(StatusCode.UNOTHERIZED, "Login Again");
    return await getIndividualQuestions(id);
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, customError.message ||"Error While get Interviewer Questions"); 
  }
};


export const setMeetingLinkService = async (
  link: string,
  questionSet: string
) => {
  try {
    return await setLink(link, questionSet);
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While set Meeting Link"); 
  }
};


export const deleteQuestionService = async (id: string) => {
  try {
    const data = await deleteQuestionById(id);
    if (!data) {
     await removeQuestionFromArray(id);
    }
    return data;
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While delete Question"); 
  }
};


export const updateQuestionService = async (
  question: string,
  options: string[],
  rightOption: string,
  id: string
) => {
  try {
    return await updateQuestion(question, options, rightOption, id);
    
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While update Question"); 
  }
};
