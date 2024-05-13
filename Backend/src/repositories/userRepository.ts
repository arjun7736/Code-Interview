import OTPDB from "../models/otpModel";
import { StatusCode, getUserCollection } from "../utils/selectDB";
import { ICompany, IInterviewee, IInterviewer, IOtp } from "../interfaces/modelInterface";

export async function findUser(email: string, role: string): Promise<any | null> {
  const userCollection = getUserCollection(role);
  if (!userCollection) {
    throw { statusCode: StatusCode.BAD_REQUEST, message: "User collection not found" };
  }
  return await userCollection.findOne({ email: email });
}

export async function createOTPuser(
  otp: number,
  hashedPassword: string,
  email: string,
  role: string,
  name?: string,
  company?: any,
  profile_picture?: string
): Promise<ICompany | IInterviewee | IInterviewer | null> {
  return await OTPDB.create({
    name: name,
    otp: otp,
    password: hashedPassword,
    email: email,
    role: role,
    company: company,
    profile_picture: profile_picture
  });
}

export async function findUserWithOTP(
  email: string,
  otp: number
): Promise<IOtp | null> {
  return await OTPDB.findOne({ email: email, otp: otp });
}

export async function deleteOTP(_id: string) {
  return await OTPDB.deleteOne({ _id: _id });
}

export async function createForgotPasswordOTP(
  email: string,
  otp: number
): Promise<IOtp | null> {
  return await OTPDB.create({ email, otp });
}

export async function updateOTP(email: string, otp: number): Promise<IOtp | null> {
  return await OTPDB.findOneAndUpdate({ email }, { otp: otp }, { new: true });
}

export async function getIndividualUserData(role: string, id: string): Promise<any> {
  const userCollection = getUserCollection(role);
  return await userCollection?.findById({ _id: id });
}
