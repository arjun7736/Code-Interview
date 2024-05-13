import { IInterviewee } from "../interfaces/modelInterface";
import { updateIntervieweeProfile } from "../repositories/intervieweeRepository";
import { errorResponse } from "../utils/error";
import { StatusCode } from "../utils/selectDB";

export const updateIntervieweeService = async (
  userId: string,
  name: string,
  profilePicture?: string
): Promise<IInterviewee | null> => {
  if (!userId || !name) {
    throw errorResponse(StatusCode.BAD_REQUEST, "Missing required information (ID and name)");
  }
  return await updateIntervieweeProfile(userId, name, profilePicture);
};
