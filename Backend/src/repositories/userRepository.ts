/* eslint-disable camelcase */
import OTPDB from "../models/otpModel";
import { StatusCode, getUserCollection } from "../utils/selectDB";
import {
  ICompany,
  IInterviewee,
  IInterviewer,
  IOtp,
} from "../interfaces/modelInterface";
import mongoose from "mongoose";
import { ErrorResponse } from "@/interfaces/errorInterface";
import { errorResponse } from "../utils/error";
import IntervieweeDB from "../models/intervieweeModel";
import InterviewerDB from "../models/interviewerModel";
import CompanyDB from "../models/companyModel";
import AdminDB from "../models/adminModel";

export async function findUser(email: string, role: string) {
  try {
    const userCollection = getUserCollection(role);
    if (!userCollection) {
      throw {
        statusCode: StatusCode.BAD_REQUEST,
        message: "User collection not found",
      };
    }
    return await userCollection.findOne({ email: email });
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, customError.message ||"Error While Find User");
  }
}

export async function createOTPuser(
  otp: number,
  hashedPassword: string,
  email: string,
  role: string,
  name?: string,
  company?: string | mongoose.Types.ObjectId,
  profile_picture?: string
): Promise<ICompany | IInterviewee | IInterviewer | null> {
  try {
    return await OTPDB.create({
      name: name,
      otp: otp,
      password: hashedPassword,
      email: email,
      role: role,
      company: company,
      profile_picture: profile_picture,
    });
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode,"Error While Create OTP");
  }
}

export async function findUserWithOTP(
  email: string,
  otp: number
): Promise<IOtp | null> {
  try {
    return await OTPDB.findOne({ email: email, otp: otp });
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Find OTP");
  }
}

export async function deleteOTP(_id: string) {
  try {
    return await OTPDB.deleteOne({ _id: _id });
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Delete OTP");
  }
}

export async function createForgotPasswordOTP(
  email: string,
  otp: number
): Promise<IOtp | null> {
  try {
    return await OTPDB.create({ email, otp });
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Create OTP");
  }
}

export async function updateOTP(
  email: string,
  otp: number
): Promise<IOtp | null> {
  try {
    return await OTPDB.findOneAndUpdate({ email }, { otp: otp }, { new: true });
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Update OTP");
  }
}

export async function getIndividualUserData(
  role: string,
  id: string
): Promise<any> {
  try {
    const userCollection = getUserCollection(role);
    return await userCollection?.findById({ _id: id });
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Get user Data");
  }
}

export const getUser = async (id: string): Promise<any> => {
  try {
    const interviewee = await IntervieweeDB.findById({ _id: id });
    const interviewer = await InterviewerDB.findById({ _id: id });
    const company = await CompanyDB.findById({ _id: id });
    const admin = await AdminDB.findById({ _id: id });
    let user: any;
    if (interviewee) {
      user = "interviewee";
    } else if (interviewer) {
      user = "interviewer";
    } else if (company) {
      user = "company";
    } else if (admin) {
      user = "admin";
    }

    return user;
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Get user Data");
  }
};
