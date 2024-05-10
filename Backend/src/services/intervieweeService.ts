import { IInterviewee } from "../interfaces/modelInterface";
import { updateIntervieweeProfile } from "../repositories/intervieweeRepository";
import { errorResponse } from "../utils/error";

export const updateIntervieweeService = async (
  userId: string,
  name: string,
  profilePicture?: string
): Promise<IInterviewee | null> => {
  if (!userId || !name) {
    throw errorResponse(400, "Missing required information (ID and name)");
  }
  return await updateIntervieweeProfile(userId, name, profilePicture);
};
