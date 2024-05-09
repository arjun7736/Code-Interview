
import mongoose from "mongoose";
import { ICompany } from "../interfaces/modelInterface";
import CompanyDB from "../models/companyModel";

export async function findUserByName(name: string): Promise<ICompany | null> {
  return await CompanyDB.findOne({ name: name });
}

export async function createCompany(
  email: string,
  name: string,
  password: string,
  role: string
): Promise<ICompany | null> {
  return await CompanyDB.create({
    email,
    name,
    password,
    role,
    isBLocked: false,
  });
}

export async function findCompany(email: string): Promise<ICompany | null> {
  return await CompanyDB.findOne({ email: email });
}

export async function updateCompanyPassword(
  email: string,
  password: string
): Promise<ICompany | null> {
  return await CompanyDB.findOneAndUpdate(
    { email: email },
    { password: password },
    { new: true }
  );
}

export async function getPremiumCompanies(): Promise<ICompany[] | null> {
  return await CompanyDB.find({
    isPremium: true,
  });
}

export async function listInterviewersByCompany(id: string) {
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
}

export async function updateCompanyProfile(id: string, name?: string, profile_picture?: string): Promise<ICompany | null> {
  return CompanyDB.findByIdAndUpdate(
    { _id: id },
    { $set: { name: name, profile_picture: profile_picture } }
  );
}

export async function paymentDone(id:string):Promise<ICompany|null>{
  return  CompanyDB.findByIdAndUpdate({_id:id},{isPremium:true},{new:true})
}