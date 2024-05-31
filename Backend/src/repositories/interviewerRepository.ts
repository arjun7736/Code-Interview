import mongoose from "mongoose";
import { IInterviewer, IQuestion } from "../interfaces/modelInterface";
import InterviewerDB from "../models/interviewerModel";
import QuestionDB from "../models/questionModel"

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
  // eslint-disable-next-line camelcase
  profile_picture?: string
): Promise<IInterviewer | null> {
  return InterviewerDB.findByIdAndUpdate(
    { _id: id },
    // eslint-disable-next-line camelcase
    { $set: { name: name, profile_picture: profile_picture } }
  );
}

export async function addNewQuestionSet(questions:IQuestion[],id:string,questionSet:number){
  return await QuestionDB.create({questionSet,questions,author:id})
}

export const countDocuments= async()=>{
  return await QuestionDB.countDocuments()
}

export const getIndividualQuestions=async(id:string)=>{
  return await QuestionDB.find({ author: id }).exec();
}