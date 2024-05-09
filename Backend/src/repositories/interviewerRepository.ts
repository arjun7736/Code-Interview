import { IInterviewer } from "../interfaces/modelInterface";
import InterviewerDB from "../models/interviewerModel";

export async function createInterviewer(
  email: string,
  password: string,
  company: any,
  role: string
): Promise<IInterviewer | null> {
  return await InterviewerDB.create({
    email,
    password,
    company,
    role,
  });
}

export async function findUserByEmail(email: string): Promise<IInterviewer | null> {
  return await InterviewerDB.findOne({ email: email });
}

export async function findByIdAndDelete(id: string) {
  return await InterviewerDB.findByIdAndDelete({ _id: id });
}

export async function updateInterviewer(
  id: string,
  name?: string,
  password?: string
): Promise<IInterviewer | null> {
  return InterviewerDB.findByIdAndUpdate(
    { _id: id },
    { $set: { password: password, name: name } },
    { new: true }
  );
}

export async function updateinterviewerProfile(
  id: string,
  name?: string,
  profile_picture?: string
): Promise<IInterviewer | null> {
  return InterviewerDB.findByIdAndUpdate(
    { _id: id },
    { $set: { name: name, profile_picture: profile_picture } }
  );
}
