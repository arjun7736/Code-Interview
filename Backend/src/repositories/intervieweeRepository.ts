
import { IInterviewee } from "../interfaces/modelInterface";
import IntervieweeDB from "../models/intervieweeModel";

export async function findInterviewee(email: string): Promise<IInterviewee | null> {
  return await IntervieweeDB.findOne({ email: email });
}

export async function createInterviewee(
  email: string,
  name: string,
  password: string,
  role?: string,
  profile_picture?: string
): Promise<IInterviewee | null> {
  return await IntervieweeDB.create({
    email,
    password,
    name,
    isBlocked: false,
    role,
    profile_picture,
  });
}

export async function getUserByEmail(email: string): Promise<IInterviewee | null> {
  return await IntervieweeDB.findOne({ email: email });
}

export async function updateIntervieweePassword(
  email: string,
  password: string
): Promise<IInterviewee | null> {
  return await IntervieweeDB.findOneAndUpdate(
    { email: email },
    { password: password },
    { new: true }
  );
}

export async function updateIntervieweeProfile(id: string, name?: string, profile_picture?: string): Promise<IInterviewee | null> {
  return IntervieweeDB.findByIdAndUpdate(
    { _id: id },
    { $set: { name: name, profile_picture: profile_picture } }
  );
}
