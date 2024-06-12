import { IInterviewee } from "../interfaces/modelInterface";
import { getLinkById, getQuestionSet, getQuestionsById, updateIntervieweeProfile, updateQuestionSetById } from "../repositories/intervieweeRepository";
import { errorResponse } from "../utils/error";
import { StatusCode } from "../utils/selectDB";

export const updateIntervieweeService = async (
  userId: string,
  name?: string,
  profilePicture?: string
): Promise<IInterviewee | null> => {
  if (!userId ) {
    throw errorResponse(StatusCode.BAD_REQUEST, "Missing required information (ID and name)");
  }
  return await updateIntervieweeProfile(userId, name, profilePicture);
};

export const fetchQuestions=async(id:string)=>{
  return await getQuestionsById(id)
}
export const getQuestionSetService =async(link:string)=>{
  return await getQuestionSet(link)
} 
export const getMeetingLinkService=async(id:string)=>{
  return await getLinkById(id)
}
export const updateQuestionSetService=async(interviewee:string,result:string,questionSet:string)=>{
return await updateQuestionSetById(interviewee,result,questionSet)
}