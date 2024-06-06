import { IInterviewer, IQuestion } from "../interfaces/modelInterface";
import {
  addNewQuestionSet,
  countDocuments,
  deleteQuestionById,
  getIndividualQuestions,
  removeQuestionFromArray,
  setLink,
  updateinterviewerProfile,
} from "../repositories/interviewerRepository";
import { errorResponse } from "../utils/error";
import { StatusCode } from "../utils/selectDB";

export const updateInterviewerService = async (
  userId: string,
  name: string,
  profilePicture?: string
): Promise<IInterviewer | null> => {
  if (!userId || !name) {
    throw errorResponse(
      StatusCode.BAD_REQUEST,
      "Missing required information (ID and name)"
    );
  }
  return await updateinterviewerProfile(userId, name, profilePicture);
};

export const addQuestions = async (questions: IQuestion[], id: string) => {
  if (questions.length === 0)
    throw errorResponse(StatusCode.BAD_REQUEST, "Cannot Add Empty Data");
  const questionSet: number = await countDocuments();
  return await addNewQuestionSet(questions, id, questionSet + 1);
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
  if(!data){
    await removeQuestionFromArray(id)
  }
  return data;
};
