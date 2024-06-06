/* eslint-disable camelcase */
import { IInterviewer, IQuestion } from "../interfaces/modelInterface";
import InterviewerDB from "../models/interviewerModel";
import QuestionDB from "../models/questionModel"
import LinkDB from "../models/linkModel";
import mongoose from "mongoose";

export async function createInterviewer(
  email: string,
  password: string,
  company: string |mongoose.Types.ObjectId |undefined ,
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

export async function addNewQuestionSet(questions:IQuestion[],id:string,questionSet:number){
  return await QuestionDB.create({questionSet,questions,author:id})
}

export const countDocuments= async()=>{
  return await QuestionDB.countDocuments()
}

export const getIndividualQuestions=async(id:string)=>{
  return await QuestionDB.find({ author: id }).exec();
}

export const setLink=async(link:string,questionSet:string)=>{
  return await LinkDB.create({meetingLink:link,questionSet:questionSet})
}
export const deleteQuestionById=async(id:string)=>{
  return await QuestionDB.findByIdAndDelete(id)
}
export const removeQuestionFromArray=async(id:string)=>{
  return await QuestionDB.updateOne(
    { 'questions._id': id },
    { $pull: { questions: { _id: id } } }
  );
}