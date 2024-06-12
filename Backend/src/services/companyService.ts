/* eslint-disable camelcase */
import Stripe from "stripe";
import cron from 'node-cron';
import { ICompany, IInterviewer } from "../interfaces/modelInterface";
import {
  getInterviewersQuestionData,
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
import { v4 as uuidv4 } from "uuid";
import { sendLink } from "../utils/sendLink";
import { StatusCode } from "../utils/selectDB";

//<=----------------------Create Interviewer service----------------------=>//
export const addInterviewerService = async (
  email: string,
  password: string,
  companyId: string
): Promise<void> => {
  if (!email || !password) {
    throw errorResponse(StatusCode.BAD_REQUEST, "Fill all the fields");
  }

  if (!isEmail(email)) {
    throw errorResponse(StatusCode.UNOTHERIZED, "Enter a valid email");
  }

  if (!isStrongPassword(password)) {
    throw errorResponse(StatusCode.UNOTHERIZED, "Weak password");
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw errorResponse(StatusCode.NOT_FOUND, "Interviewer already exists");
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
    throw errorResponse(StatusCode.NOT_FOUND, "Interviewer Not Found");
  }
};

//<=----------------------List Interviewer service----------------------=>//

export const listInterviewersService = async (
  companyId: string | undefined
): Promise<IInterviewer[]> => {
  if (!companyId || typeof companyId !== "string") {
    throw errorResponse(StatusCode.BAD_REQUEST, "Invalid Company ID");
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
    throw errorResponse(
      StatusCode.BAD_REQUEST,
      "Missing required information (ID and name)"
    );
  }
  let hashedPassword: string | undefined;
  if (password) {
    if (!isStrongPassword(password)) {
      throw errorResponse(StatusCode.UNOTHERIZED, "Weak password");
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
  name?: string,
  profilePicture?: string
): Promise<ICompany | null> => {
  if (!userId || !name) {
    throw errorResponse(
      StatusCode.BAD_REQUEST,
      "Missing required information (ID and name)"
    );
  }
  const updatedCompany = await updateCompanyProfile(
    userId,
    name,
    profilePicture
  );
  return updatedCompany;
};

//<=----------------------Sent Mail service----------------------=>//
export const sentLinkToEmail = async (
  interviewerEmail: string,
  intervieweeEmail: string,
  date: string,
  time: string
): Promise<void> => {
  const link = uuidv4();

  if (!date ||!time) {
    throw new Error("Date And Time Missing");
  }

  const datenum = new Date(date);
  const istDate = new Date(datenum.getTime() + (330 * 60000));

  const dateStringOnly = istDate.toISOString().split('T')[0];
  const timeComponent = time.split(':')[0]; 

  const minuteComponent = time.split(':')[1];
  const dat = new Date(`${dateStringOnly}T${timeComponent}:${minuteComponent}:00`);

  dat.setMinutes(dat.getMinutes() - 5);
  const cronExpression = `${dat.getMinutes()} ${dat.getHours()} ${dat.getDate()} ${dat.getMonth() + 1} *`;

  cron.schedule(cronExpression, async () => {
    try {
      await sendLink(interviewerEmail, link);
      await sendLink(intervieweeEmail, link);
      console.log('Links sent successfully.');
    } catch (error) {
      console.error('Error sending links:', error);
    }
  });
  console.log(`Scheduled to send links at: ${dat.toLocaleString()}`);
};



export const getInterviewDataService = async (id: string) => {
  const data = await getInterviewersQuestionData(id);
  const filteredData = data.filter((d) => d.attentedInterviewees.length > 0);
  return filteredData;
};
