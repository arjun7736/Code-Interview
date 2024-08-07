import mongoose, { Document } from "mongoose";

export interface ICompany extends Document {
  email: string;
  password: string;
  name?: string;
  profile_picture?: string;
  isBlocked?: boolean;
  isPremium?: boolean;
  role?: string;
}

export interface IAdmin extends Document {
  email: string;
  password: string;
  profile_picture?: string;
  name?: string;
  isBlocked?: boolean;
  role?: string;
}

export interface IInterviewee extends Document {
  email?: string;
  password?: string | null;
  name?: string;
  profile_picture?: string;
  isBlocked?: boolean;
  role?: string;
}

export interface IInterviewer extends Document {
  email: string;
  password: string;
  profile_picture?: string;
  name?: string;
  isBlocked?: boolean;
  company?: string | mongoose.Types.ObjectId ;
  role?: string;
}

export interface IOtp extends Document {
  email: string;
  password?: string;
  otp?: number;
  name?: string;
  createdAt?: Date;
  company?: mongoose.Types.ObjectId;
  role?: string;
}


interface IIndividualQuestion {
  question: string;
  options: string[];
  rightAnswer: string;
}

interface IAttendees{
  interviewee:mongoose.Types.ObjectId
  result:string
  date:Date
}
export interface IQuestion extends Document {
  questionSet: number;
  questions: IIndividualQuestion[];
  author: mongoose.Types.ObjectId; 
  attentedInterviewees: IAttendees[]; 
}

export type UserModel = IAdmin | ICompany | IInterviewee | IInterviewer;

export interface ILink extends Document{
  meetingLink:string,
  questionSet:string,
  createdAt:Date
}
export interface IMeeting extends Document{
  meetingLink:string,
  company:string,
  Interviewee:string,
  Interviewer:string,
  createdAt:Date,
  expiresAt:Date
}  