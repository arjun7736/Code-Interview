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
  if (!userId ) {
    throw errorResponse(
      StatusCode.BAD_REQUEST,
      "Missing required information (ID)"
    );
  }
  return await updateinterviewerProfile(userId, name, profilePicture);
};


export const addQuestions = async (
  questions: IQuestion[],
  id: string,
  questionNum: number | null
) => {
  if (questions.length === 0)
    throw errorResponse(StatusCode.BAD_REQUEST, "Cannot Add Empty Data");
  if (!questionNum) {
    const questionSet: number = await countDocuments();
    return await addNewQuestionSet(questions, id, questionSet + 1);
  } else {
    return await addToQuestionSet(questions, id, questionNum);
  }
};


export const getInterviewerQuestions = async (id: string) => {
  if (!id) throw errorResponse(StatusCode.UNOTHERIZED, "Login Again");
  return await getIndividualQuestions(id);
};


export const setMeetingLinkService = async (
  link: string,
  questionSet: string
) => {
  return await setLink(link, questionSet);
};


export const deleteQuestionService = async (id: string) => {
  const data = await deleteQuestionById(id);
  if (!data) {
   await removeQuestionFromArray(id);
  }
  return data;
};


export const updateQuestionService = async (
  question: string,
  options: string[],
  rightOption: string,
  id: string
) => {
  return await updateQuestion(question, options, rightOption, id);
};
