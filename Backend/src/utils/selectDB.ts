import CompanyDB from "../models/companyModel";
import IntervieweeDB from "../models/intervieweeModel";
import InterviewerDB from "../models/interviewerModel";
import AdminDB from "../models/adminModel";
import { Model } from "mongoose";

export enum Role {
    ADMIN = "admin",
    INTERVIEWER = "interviewer",
    INTERVIEWEE = "interviewee",
    COMPANY = "company",
  }
  
export function getUserCollection(role: string): Model<any> | null {
    let userCollection: Model<any> | null = null;
    switch (role) {
      case Role.ADMIN:
        userCollection = AdminDB;
        break;
      case Role.INTERVIEWER:
        userCollection = InterviewerDB;
        break;
      case Role.INTERVIEWEE:
        userCollection = IntervieweeDB;
        break;
      case Role.COMPANY:
        userCollection = CompanyDB;
        break;
    }
    return userCollection;
  }