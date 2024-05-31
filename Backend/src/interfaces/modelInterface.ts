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
  company?: any;
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

export interface IQuestion extends Document {
  questionSet: number;
  questions: IIndividualQuestion[];
  author: mongoose.Types.ObjectId; 
  attentedInterviewees: mongoose.Types.ObjectId[]; 
}

export type UserModel = IAdmin | ICompany | IInterviewee | IInterviewer;
