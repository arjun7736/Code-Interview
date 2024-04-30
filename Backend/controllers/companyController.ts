import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../utils/error";
import { isEmail, isStrongPassword } from "../utils/validator";
import InterviewerDB, { IInterviewer } from "../models/interviewerModel";
import bcrypt from "bcrypt";
import { sentOTP } from "../utils/otp";
import OTPDB from "../models/otpModel";
import CompanyDB, { ICompany } from "../models/companyModel";
import mongoose from "mongoose";
import Stripe from "stripe";
import AdminDB from "../models/adminModel";
import IntervieweeDB from "../models/intervieweeModel";
import { Model } from "mongoose";

//<=-----------------------Interviewer add---------------------------=>//

export const addInterviewer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, userId } = req.body;

    if (!email || !password)
      return next(errorHandler(400, "Fill all the Feild"));

    if (!isEmail(email)) return next(errorHandler(401, "Enter a Valied Email"));

    if (!isStrongPassword(password))
      return next(errorHandler(401, "Weak Password"));

    const isExist: IInterviewer | null = await InterviewerDB.findOne({
      email: email,
    });

    if (isExist) return next(errorHandler(404, "Interviewer already Exist"));

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const otp: number = Math.floor(100000 + Math.random() * 900000);
    sentOTP(email, otp);

    await OTPDB.create({
      email: email,
      otp: otp,
      password: hashedPassword,
      company: userId,
      role: "interviewer",
    });
    res.json({ email, role: "interviewer" });
  } catch (error) {
    next(error);
  }
};

//<=------------------------Delete Interviewer--------------------------=>//
export const deleteInterviewer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await InterviewerDB.findByIdAndDelete({ _id: id });
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

//<=------------------------List Interviewers--------------------------=>//
export const listInterviewers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { Id } = req.query;
    const objectId = new mongoose.Types.ObjectId(Id as string);

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
              },
            },
          },
        },
      },
    ];

    const data = await CompanyDB.aggregate(pipeline);

    res.json(data);
  } catch (error) {
    next(error);
  }
};

//<=------------------------Edit Interviewer--------------------------=>//
export const editInterviewer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, name, id } = req.body;
    if (password) {
      let isStrongPass = isStrongPassword(password);
      if (!isStrongPass) return next(errorHandler(401, "Weak Password"));

      const hpass = await bcrypt.hash(password, 10);
  
        await InterviewerDB.findByIdAndUpdate(
          { _id: id },
          { $set: { password: hpass, name: name } },
          { new: true }
        );
    }else{
       await InterviewerDB.findByIdAndUpdate(
        { _id: id },
        { $set: { name: name } },
        { new: true }
      );
    }
  const interviewer = await InterviewerDB.findById(id);

    if (interviewer) {
      const interviewerWithoutPassword:Partial<IInterviewer> = { ...interviewer.toObject() };
      delete interviewerWithoutPassword.password;
      res.json({
        message: "Interviewer Updated Successfully ",
        interviewerWithoutPassword,
      });
    }
  } catch (error) {
    next(error);
  }
};

//<=------------------------Buy Premium--------------------------=>//
export const buyPremium = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!process.env.STRIPE_KEY) {
      return next(errorHandler(500, "Stripe key not provided"));
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
      success_url: "http://localhost:3000/paymentSuccess",
      cancel_url: "http://localhost:3000/company",
      customer_email: req.body.email,
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "IN"],
      },
    });

    const company = await CompanyDB.findByIdAndUpdate(
      { _id: req.body._id },
      { isPremium: true },
      { new: true }
    );

    res.json({ sessionId: session.id });
  } catch (error) {
    next(error);
  }
};

//<=------------------------Update Company Profle--------------------------=>//
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req?.user._id;
    const userType = req?.userType;
    const { name, profilePicture } = req.body;

    let userCollection: Model<any> | null = null;
    switch (userType) {
      case "Interviewer":
        userCollection = InterviewerDB;
        break;
      case "Interviewee":
        userCollection = IntervieweeDB;
        break;
      case "Company":
        userCollection = CompanyDB;
        break;
      case "Admin":
        userCollection = AdminDB;
        break;
    }
    if (!userCollection) {
      return next(errorHandler(500, "User collection is not defined"));
    }
    const company = await userCollection.findByIdAndUpdate(
      { _id: id },
      { $set: { name: name, profile_picture: profilePicture } },
      { new: true }
    );

    if (company) {
      const companyWithoutPassword = { ...company.toObject() };
      delete companyWithoutPassword.password;
      res.json(companyWithoutPassword);
    }
  } catch (error) {
    next(error);
  }
};
