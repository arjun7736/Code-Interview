import CompanyDB from "../models/companyModel";
import IntervieweeDB from "../models/intervieweeModel";
import InterviewerDB from "../models/interviewerModel";
import AdminDB from "../models/adminModel";
import OTPDB from "../models/otpModel";
import { Model } from "mongoose";

export enum UserCollection {
    ADMIN = "admin",
    INTERVIEWER = "interviewer",
    INTERVIEWEE = "interviewee",
    COMPANY = "company",
  }
  
export function getUserCollection(role: string): Model<any> | null {
  // console.log(role)
    let userCollection: Model<any> | null = null;
    switch (role) {
      case UserCollection.ADMIN:
        userCollection = AdminDB;
        break;
      case UserCollection.INTERVIEWER:
        userCollection = InterviewerDB;
        break;
      case UserCollection.INTERVIEWEE:
        userCollection = IntervieweeDB;
        break;
      case UserCollection.COMPANY:
        userCollection = CompanyDB;
        break;
    }
    return userCollection;
  }
