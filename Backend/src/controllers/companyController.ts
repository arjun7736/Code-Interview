import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { ICompany, IInterviewer } from "../interfaces/modelInterface";
import { errorResponse } from "../utils/error";
import { isEmail, isStrongPassword } from "../utils/validator";
import { sentOTP } from "../utils/otp";
import Stripe from "stripe";
import { findByIdAndDelete, findUserByEmail, updateInterviewer } from "../repositories/interviewerRepository";
import { createOTPuser } from "../repositories/userRepository";
import { listInterviewersByCompany, paymentDone, updateCompanyProfile } from "../repositories/companyRepository";
import { ErrorResponse } from "../interfaces/errorInterface";

//<=-----------------------add Interviewer---------------------------=>//

export const addInterviewer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password, userId } = req.body;

    if (!email || !password) throw errorResponse(400, "Fill all the Feild");

    if (!isEmail(email)) throw errorResponse(401, "Enter valied Email");

    if (!isStrongPassword(password)) throw errorResponse(401, "Weak Password");

    const isExist: IInterviewer | null =
      await findUserByEmail(email);

    if (isExist) throw errorResponse(404, "Interviewer already Exist");

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const otp: number = Math.floor(100000 + Math.random() * 900000);
    sentOTP(email, otp);

    const role: string = "interviewer";
    const company: string = userId;

    const createInterviewer = await createOTPuser(
      otp,
      hashedPassword,
      email,
      role,
      company
    );

    if (createInterviewer) {
      res.json({ email, role: "interviewer" });
    } else {
      res.json({ Message: "Error While creating a Interviewer" });
    }

  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || 500;
    res.status(statusCode).send(customError.message);
  }
};

//<=-----------------------Delete Interviewer---------------------------=>//

export const deleteInterviewer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await findByIdAndDelete(id);
    if(data){
      res.json({ message: "Deleted Successfully" });
    }else{
      throw errorResponse(500,"Error in Deletion")
    }
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || 500;
    res.status(statusCode).send(customError.message);
  }
};

//<=-----------------------List Interviewers---------------------------=>//
export const listInterviewers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { Id } = req.query;

    if (!Id || typeof Id !== "string") {
      throw errorResponse(400, "Invalid Id");
    }
    const data = await listInterviewersByCompany(Id);
    res.json(data);
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || 500;
    res.status(statusCode).send(customError.message);
  }
};

//<=------------------------Edit Interviewer--------------------------=>//

export const editInterviewer = async (req: Request, res: Response) => {
  try {
    const { password, name, id } = req.body;
let hpass
    if (password) {
      const isStrongPass: boolean = isStrongPassword(password);
      if (!isStrongPass) throw errorResponse(401, "Weak Password");

       hpass = await bcrypt.hash(password, 10);
    }
    const updatedData = await updateInterviewer(
      id,
      name,
      hpass
    );

    if (updatedData) {
      const interviewerWithoutPassword: Partial<IInterviewer> = {
        ...updatedData.toObject(),
      };
      delete interviewerWithoutPassword.password;
      res.json({
        message: "Interviewer Updated Successfully ",
        interviewerWithoutPassword,
      });
    }
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || 500;
    res.status(statusCode).send(customError.message);
  }
};

//<=------------------------Buy Premium--------------------------=>//
export const buyPremium = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!process.env.STRIPE_KEY) {
      throw errorResponse(500, "Stripe key not provided");
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
      customer_email: req.body.email,
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "IN"],
      },
    });

await paymentDone(req.body._id)

    res.json({ sessionId: session.id });
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || 500;
    res.status(statusCode).send(customError.message);
  }
};

//<=------------------------Update Company Profle--------------------------=>//
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const id = req?.user._id;
    const { name, profilePicture } = req.body;

    const updatedCompany: ICompany | null =
      await updateCompanyProfile(id, name, profilePicture);

    if (updatedCompany) {
      const companyWithoutPassword = { ...updatedCompany.toObject() };
      delete companyWithoutPassword.password;
      res.json(companyWithoutPassword);
    }
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || 500;
    res.status(statusCode).send(customError.message);
  }
};
