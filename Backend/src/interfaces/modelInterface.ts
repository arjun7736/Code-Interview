import mongoose, { Document } from "mongoose";

export interface ICompany extends Document {
    email: string;
    password: string;
    name?: string;
    profile_picture?: string;
    isBlocked?: boolean;
    isPremium?:boolean,
    role?:string; 
}

export interface IAdmin extends Document{
    email:string;
    password:string;
    profile_picture?:string;
    name?:string;
    role?:string; 

}

export interface IInterviewee extends Document{
    email?:string;
    password?:string|null;
    name?:string;
    profile_picture?:string;
    isBlocked?:boolean
    role?:string; 
}


export interface IInterviewer extends Document {
    email: string;
    password: string;
    profile_picture?: string;
    name?: string;
    isBlocked?: boolean;
    company?: mongoose.Schema.Types.ObjectId ;
    role?:string; 
  }
  
  export interface IOtp extends Document {
    email: string;
    password?: string;
    otp?: number;
    name?: string;
    createdAt?: Date; 
    company?: mongoose.Types.ObjectId; 
    role?:string; 
  }
  
