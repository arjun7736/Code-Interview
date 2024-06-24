import { ErrorResponse } from "@/interfaces/errorInterface";
import { IInterviewee } from "../interfaces/modelInterface";
import {
  getLinkById,
  getQuestionSet,
  getQuestionsById,
  updateIntervieweeProfile,
  updateQuestionSetById,
} from "../repositories/intervieweeRepository";
import { errorResponse } from "../utils/error";
import { StatusCode } from "../utils/selectDB";

export const updateIntervieweeService = async (
  userId: string,
  name?: string,
  profilePicture?: string
): Promise<IInterviewee | null> => {
  try {
    if (!userId) {
      throw errorResponse(
        StatusCode.BAD_REQUEST,
        "Missing required information (ID and name)"
      );
    }
    return await updateIntervieweeProfile(userId, name, profilePicture);
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While update Interviewee");
  }
};

export const fetchQuestions = async (id: string) => {
  try {
    return await getQuestionsById(id);
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While fetch Questions");
  }
};
export const getQuestionSetService = async (link: string) => {
  try {
    return await getQuestionSet(link);
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Get QuestionSet");
  }
};
export const getMeetingLinkService = async (id: string) => {
  try {
    return await getLinkById(id);
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While get meeting link");
  }
};
export const updateQuestionSetService = async (
  interviewee: string,
  result: string,
  questionSet: string
) => {
  try {
    return await updateQuestionSetById(interviewee, result, questionSet);
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While update Quesationset");
  }
};
