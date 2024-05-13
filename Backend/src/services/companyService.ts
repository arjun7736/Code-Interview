import Stripe from "stripe";
import { ICompany, IInterviewer } from "../interfaces/modelInterface";
import {
  listInterviewersByCompany,
  paymentDone,
  updateCompanyProfile,
} from "../repositories/companyRepository";
import {
  findByIdAndDelete,
  findUserByEmail,
  updateInterviewer,
} from "../repositories/interviewerRepository";
import { createOTPuser } from "../repositories/userRepository";
import { errorResponse } from "../utils/error";
import { sentOTP } from "../utils/otp";
import { isEmail, isStrongPassword } from "../utils/validator";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { sendLink } from "../utils/sendLink";

//<=----------------------Create Interviewer service----------------------=>//
export const addInterviewerService = async (
  email: string,
  password: string,
  companyId: string
): Promise<void> => {
  if (!email || !password) {
    throw errorResponse(400, "Fill all the fields");
  }

  if (!isEmail(email)) {
    throw errorResponse(401, "Enter a valid email");
  }

  if (!isStrongPassword(password)) {
    throw errorResponse(401, "Weak password");
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw errorResponse(404, "Interviewer already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000);
  await sentOTP(email, otp);

  const role = "interviewer";
  await createOTPuser(otp, hashedPassword, email, role, companyId);
};

//<=----------------------Delete Interviewer service----------------------=>//
export const deleteInterviewerService = async (id: string): Promise<void> => {
  const deletedInterviewer = await findByIdAndDelete(id);
  if (!deletedInterviewer) {
    throw errorResponse(404, "Interviewer Not Found");
  }
};

//<=----------------------List Interviewer service----------------------=>//

export const listInterviewersService = async (
  companyId: string | undefined
): Promise<IInterviewer[]> => {
  if (!companyId || typeof companyId !== "string") {
    throw errorResponse(400, "Invalid Company ID");
  }

  const interviewers = await listInterviewersByCompany(companyId);
  return interviewers;
};

//<=----------------------Edit Interviewer service----------------------=>//

export const editInterviewerService = async (
  id: string,
  name: string,
  password?: string
): Promise<IInterviewer | null> => {
  if (!id || !name) {
    throw errorResponse(400, "Missing required information (ID and name)");
  }
  let hashedPassword: string | undefined;
  if (password) {
    if (!isStrongPassword(password)) {
      throw errorResponse(401, "Weak password");
    }
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const updatedInterviewer = await updateInterviewer(id, name, hashedPassword);
  return updatedInterviewer;
};

//<=----------------------Buy Premium service----------------------=>//
export const buyPremiumService = async (
  email: string,
  userId: string
): Promise<string> => {
  if (!process.env.STRIPE_KEY) {
    throw new Error("Stripe key not provided");
  }

  const stripe = new Stripe(process.env.STRIPE_KEY);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Premium Subscription",
          },
          unit_amount: 1999 * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:5173/paymentSuccess",
    cancel_url: "http://localhost:5173/company",
    customer_email: email,
    billing_address_collection: "auto",
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "IN"],
    },
  });
  await paymentDone(userId);

  return session.id;
};

//<=----------------------Update Profile service----------------------=>//
export const updateProfileService = async (
  userId: string,
  name: string,
  profilePicture?: string
): Promise<ICompany | null> => {
  if (!userId || !name) {
    throw errorResponse(400, "Missing required information (ID and name)");
  }
  const updatedCompany = await updateCompanyProfile(
    userId,
    name,
    profilePicture
  );
  return updatedCompany;
};

//<=----------------------Sent Mail service----------------------=>//
export const sentLinkToEmail=async(interviewerEmail:string,intervieweeEmail:string):Promise<void>=>{
  const link =uuidv4()
 await sendLink(interviewerEmail,link)
 await sendLink(intervieweeEmail,link)
}