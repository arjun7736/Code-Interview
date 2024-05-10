import { IInterviewer } from "../interfaces/modelInterface";
import { updateinterviewerProfile } from "../repositories/interviewerRepository";
import { errorResponse } from "../utils/error";

export const updateInterviewerService = async (
  userId: string,
  name: string,
  profilePicture?: string
): Promise<IInterviewer | null> => {
  if (!userId || !name) {
    throw errorResponse(400, "Missing required information (ID and name)");
  }
  return await updateinterviewerProfile(userId, name, profilePicture);
};
