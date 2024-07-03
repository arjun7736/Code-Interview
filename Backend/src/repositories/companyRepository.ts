/* eslint-disable camelcase */

import mongoose from "mongoose";
import { ICompany } from "../interfaces/modelInterface";
import CompanyDB from "../models/companyModel";
import QuestionDB from "../models/questionModel";
import { ErrorResponse } from "@/interfaces/errorInterface";
import { StatusCode } from "../utils/selectDB";
import { errorResponse } from "../utils/error";

export async function findUserByName(name: string): Promise<ICompany | null> {
  try {
    return await CompanyDB.findOne({ name: name });
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While find Company"); 
  }
}

export async function createCompany(
  email: string,
  name: string,
  password: string,
  role: string
): Promise<ICompany | null> {
  try {
    return await CompanyDB.create({
      email,
      name,
      password,
      role,
      isBLocked: false,
    }); 
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Create company"); 
  }
}

export async function findCompany(email: string): Promise<ICompany | null> {
  try {
    return await CompanyDB.findOne({ email: email });
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode,  "Error While Find Company"); 
  }
}

export async function updateCompanyPassword(
  email: string,
  password: string
): Promise<ICompany | null> {
  try {
    return await CompanyDB.findOneAndUpdate(
      { email: email },
      { password: password },
      { new: true }
    );
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While update Password"); 
  }
}

export async function getPremiumCompanies(): Promise<ICompany[] | null> {
  try {
    return await CompanyDB.find({
      isPremium: true,
    });
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Get Premium Companies"); 
  }
}

export async function listInterviewersByCompany(id: string) {
  try {
    const objectId = new mongoose.Types.ObjectId(id as string);
    const pipeline = [
      {
        $match: {
          _id: objectId,
        },
      },
      {
        $lookup: {
          from: "interviewers",
          localField: "_id",
          foreignField: "company",
          as: "interviewers",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          interviewers: {
            $map: {
              input: "$interviewers",
              as: "interviewer",
              in: {
                _id: "$$interviewer._id",
                email: "$$interviewer.email",
                name: "$$interviewer.name",
                profile_picture: "$$interviewer.profile_picture",
              },
            },
          },
        },
      },
    ];
    return await CompanyDB.aggregate(pipeline);
    
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While list Interviewers"); 
  }
}

export async function updateCompanyProfile(
  id: string,
  name?: string,
  profile_picture?: string
): Promise<ICompany | null> {
  try {
    return CompanyDB.findByIdAndUpdate(
      { _id: id },
      { $set: { name: name, profile_picture: profile_picture } }
    );
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While update PRofile"); 
  }
}

export async function paymentDone(id: string): Promise<ICompany | null> {
  try {
    return CompanyDB.findByIdAndUpdate(
      { _id: id },
      { isPremium: true },
      { new: true }
    );
    
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While update Password"); 
  }
}

export const getInterviewersQuestionData = async (id: string) => {
  try {
    const objectId = new mongoose.Types.ObjectId(id);
    const data = await QuestionDB.find({ author: objectId })
      .populate({
        path: "attentedInterviewees.interviewee",
        model: "interviewee",
        select: "name"
      })
      .exec();
    return data;
    
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Interviewers Questions"); 
  }
};
