/* eslint-disable camelcase */
import Stripe from "stripe";
import cron from "node-cron";
import { ICompany, IInterviewer } from "../interfaces/modelInterface";
import {
  getInterviewersQuestionData,
  getLinks,
  listInterviewersByCompany,
  paymentDone,
  setLinkWithUsers,
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
import { ErrorResponse } from "@/interfaces/errorInterface";

//<=----------------------Create Interviewer service----------------------=>//
export const addInterviewerService = async (
  email: string,
  password: string,
  companyId: string
): Promise<void> => {
  try {
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
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(
      statusCode,
      customError.message || "Error While Create Interviewer"
    );
  }
};

//<=----------------------Delete Interviewer service----------------------=>//
export const deleteInterviewerService = async (id: string): Promise<void> => {
  try {
    const deletedInterviewer = await findByIdAndDelete(id);
    if (!deletedInterviewer) {
      throw errorResponse(StatusCode.NOT_FOUND, "Interviewer Not Found");
    }
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(
      statusCode,
      customError.message || "Error While Deleting Interviewer"
    );
  }
};

//<=----------------------List Interviewer service----------------------=>//

export const listInterviewersService = async (
  companyId: string | undefined
): Promise<IInterviewer[]> => {
  try {
    if (!companyId || typeof companyId !== "string") {
      throw errorResponse(StatusCode.BAD_REQUEST, "Invalid Company ID");
    }

    const interviewers = await listInterviewersByCompany(companyId);
    return interviewers;
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(
      statusCode,
      customError.message || "Error While List Interviewer"
    );
  }
};

//<=----------------------Edit Interviewer service----------------------=>//

export const editInterviewerService = async (
  id: string,
  name: string,
  password?: string
): Promise<IInterviewer | null> => {
  try {
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

    const updatedInterviewer = await updateInterviewer(
      id,
      name,
      hashedPassword
    );
    return updatedInterviewer;
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(
      statusCode,
      customError.message || "Error While resend OTP"
    );
  }
};

//<=----------------------Buy Premium service----------------------=>//
export const buyPremiumService = async (
  email: string,
  userId: string
): Promise<string> => {
  try {
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
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(
      statusCode,
      customError.message || "Error While Payment"
    );
  }
};

//<=----------------------Update Profile service----------------------=>//
export const updateProfileService = async (
  userId: string,
  name?: string,
  profilePicture?: string
): Promise<ICompany | null> => {
  try {
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
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(
      statusCode,
      customError.message || "Error While Update Profile"
    );
  }
};

//<=----------------------Sent Mail service----------------------=>//
export const sentLinkToEmail = async (
  interviewerEmail: string,
  intervieweeEmail: string,
  date: string,
  time: string,
  id:string
): Promise<void> => {
  try {
    const link = uuidv4();

    if (!date || !time) {
      throw new Error("Date And Time Missing");
    }

    const datenum = new Date(date);
    const istDate = new Date(datenum.getTime() + 330 * 60000);

    const dateStringOnly = istDate.toISOString().split("T")[0];
    const timeComponent = time.split(":")[0];

    const minuteComponent = time.split(":")[1];
    const dat = new Date(
      `${dateStringOnly}T${timeComponent}:${minuteComponent}:00`
    );

    dat.setMinutes(dat.getMinutes() - 5);
    const cronExpression = `${dat.getMinutes()} ${dat.getHours()} ${dat.getDate()} ${
      dat.getMonth() + 1
    } *`;

    await setLinkWithUsers(interviewerEmail,intervieweeEmail,link,dat,id)

    cron.schedule(cronExpression, async () => {
      try {
        await sendLink(interviewerEmail, link);
        await sendLink(intervieweeEmail, link);
      } catch (error) {
        const customError = error as ErrorResponse;
        const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
        throw errorResponse(
          statusCode,
          customError.message || "Error While Link sent "
        );
      }
    });
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(
      statusCode,
      customError.message || "Error While Link sent "
    );
  }
};

export const getInterviewDataService = async (id: string) => {
  try {
    const data = await getInterviewersQuestionData(id);
    const filteredData = data.filter((d) => d.attentedInterviewees.length > 0);
    return filteredData;
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While resend OTP");
  }
};

export const getAllLinks =async(id:string)=>{
  try {
    return await getLinks(id)
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Getting links");
  }
}