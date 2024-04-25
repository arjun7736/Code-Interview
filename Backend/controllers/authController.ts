import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../utils/error";
import { isEmail, isStrongPassword } from "../utils/validator";
import CompanyDB, { ICompany } from "../models/companyModel";
import InterviewerDB, { IInterviewer } from "../models/interviewerModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AdminDB, { IAdmin } from "../models/adminModel";
import { sentOTP } from "../utils/otp";
import OTPDB, { IOtp } from "../models/otpModel";
import IntervieweeDB, { IInterviewee } from "../models/intervieweeModel";
import generatePassword from "generate-password";
import { Model } from "mongoose";



//<=...............................SignUp........................=>//

export const Signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

    const { name, password, confirmpassword, email, role } = req.body;

    if (!name || !password || !email || !confirmpassword)
      return next(errorHandler(400, "Missing fields"));

    if (password !== confirmpassword) {
      return next(errorHandler(401, 'Passwords do not match'));
    }

    if (!isEmail(email)) {
      return next(errorHandler(422, 'Invalid email format'));
    }

    if (!isStrongPassword(password)) {
      return next(
        errorHandler(
          422,
          'Password must contain lowercase, uppercase, symbol, and number'
        )
      );
    }

    let existingUser;
    if (role === 'company') {
      existingUser = await CompanyDB.findOne({ email });
      const exist_name= await CompanyDB.findOne({ name });
      if(exist_name) return  next(errorHandler(409,'Company Name already exists'))
    } else  {
      existingUser = await IntervieweeDB.findOne({ email });
    } 

    if (existingUser) {
      return next(errorHandler(401, 'Email already exists'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000);

    sentOTP(email, otp);
    await OTPDB.create({
      name,
      password: hashedPassword,
      otp,
      email,
      role,
    });

    res.json({ email,role }); 
  } catch (error) {
    console.error('Error in companySignup:', error);
    next(error);
  }
};


//<=...............................Login........................=>//

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password)
      return next(errorHandler(400, "Please provide all details"));

    let userCollection:Model<any>|null =null;
    switch (role) {
      case 'admin':
        userCollection = AdminDB;
        break;
      case 'interviewer':
        userCollection = InterviewerDB;
        break;
      case 'interviewee':
        userCollection = IntervieweeDB;
        break;
      case 'company':
        userCollection = CompanyDB;
        break;
    }

    if (!userCollection) {
      return next(errorHandler(500, 'User collection is not defined'));
    }
    const user = await userCollection.findOne({ email });
    if (!user) {
      return next(errorHandler(401, 'User not found'));
    }

    const passwordMatch:boolean = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return next(errorHandler(401, 'Wrong Credentails'));
    }
    if (user.isBlocked) return next(errorHandler(403, "Account is Blocked"));

    const secret: string | undefined = process.env.JWT_SECRET;

    if(secret){
      const token = jwt.sign({ _id: user._id }, secret);
      const expire = new Date(Date.now() + 3600000);
      const userWithoutPassword = { ...user.toObject() };
      delete userWithoutPassword.password;
      res.cookie(`${role}_token`,token,{httpOnly:true,expires:expire}).status(200).json(userWithoutPassword)
    }
  } catch (error) {
    console.error('Error in login:', error);
    next(error);
  }
};


//<=...............................Verify OTP ........................=>//
export const verifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.body);
    const { email, role, otp } = req.body;

    let data: IOtp | null = null;

    if (!otp) return next(errorHandler(400, "Enter OTP"));

    data = await OTPDB.findOne({ email: email, otp: otp });
    
    if (!data) return next(errorHandler(400, "Wrong OTP Found!"));

    switch (role) {
      case "company":
        await CompanyDB.create({
          email: data?.email,
          password: data?.password,
          name: data?.name,
          isBlocked: false,
          role:data?.role
        });
        await OTPDB.deleteOne({ _id: data?._id });
        break;
      case "interviewer":
        await InterviewerDB.create({
          email: data?.email,
          password: data?.password,
          name: data?.name,
          company: data?.company,
          isBlocked: false,
          role:data?.role

        });
        await OTPDB.deleteOne({ _id: data?._id });
        break;
      case "interviewee":
        await IntervieweeDB.create({
          email: data?.email,
          password: data?.password,
          name: data?.name,
          isBlocked: false,
          role:data?.role
        });
        await OTPDB.deleteOne({ _id: data?._id });
        break;
    }
    res.json({ message: "OTP Verified Successfully" });
  } catch (error) {
    next(error);
  }
};

//<=...............................Logout........................=>//

export const logout = (req: Request, res: Response): void => {
  let tokenCookieName: string;
  if (req.cookies.company_token) {
    tokenCookieName = "company_token";
  } else if (req.cookies.interviewer_token) {
    tokenCookieName = "interviewer_token";
  } else if (req.cookies.interviewee_token) {
    tokenCookieName = "interviewee_token";
  } else if (req.cookies.admin_token) {
    tokenCookieName = "admin_token";
  }else {
    res.status(400).json({ message: "No active session found" });
    return;
  }
  res.clearCookie(tokenCookieName);
  res
    .status(200)
    .json({ message: "Logged out successfully!", user: tokenCookieName });
};

//<=...............................Forgot Password OTP........................=>//
export const forgotPasswordOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, role } = req.body;
    let IsUserExist = null;
    if (role === "company") {
      IsUserExist = await CompanyDB.findOne({ email: email });
    } else {
      IsUserExist = await IntervieweeDB.findOne({ email: email });
    }
    if (!IsUserExist) return next(errorHandler(404, "No user Fount"));

    const OTP: number = Math.floor(100000 + Math.random() * 900000);
    sentOTP(email, OTP);
    await OTPDB.create({ email: email, otp: OTP });
    res.json({ message: "OTP sent successfully ", email, role });
  } catch (error) {
    next(error);
  }
};

//<=...............................Forgot Password OTP........................=>//
export const verifyForgotPasswordOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, otp, role } = req.body;
    let user: IOtp | null = await OTPDB.findOne({ email: email, otp: otp });
    if (!user) return next(errorHandler(400, "Invalied OTP"));
    res.json({ email, role, messsage: "OTP Verified" });
  } catch (error) {
    next(error);
  }
};

//<=...............................creating New password........................=>//
export const createNewPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, confirmpassword, role } = req.body;
    if (password !== confirmpassword)
      return next(errorHandler(400, "Passwords do not match"));
    let user: ICompany | IInterviewee | null = null;
    const hPass = await bcrypt.hash(password, 10);
    if (role === "company") {
      user = await CompanyDB.findOneAndUpdate(
        { email: email },
        { password: hPass },
        { new: true }
      );
    } else {
      user = await IntervieweeDB.findOneAndUpdate(
        { email: email },
        { password: hPass },
        { new: true }
      );
    }
    res.json(role);
  } catch (error) {
    next(error);
  }
};

//<=...............................creating New password........................=>//

export const resentOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email,role } = req.body;
    const OTP: number = Math.floor(100000 + Math.random() * 900000);
    const user: IOtp | null = await OTPDB.findOneAndUpdate(
      { email },
      { otp: OTP },
      { new: true }
    );
    if (!user)
      return next(errorHandler(500, "Session Expired Please Signup Again"));
    sentOTP(email, OTP);
    res.json({ message: "Otp Resent Successfully" });
  } catch (error) {
    next(error);
  }
};

//<=...............................Saving Google signin user........................=>//
export const googleSigninUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { displayName, email, photoURL } = req.body;

    const interviewee: IInterviewee | null = await IntervieweeDB.findOne({
      email: email,
    });

    if (interviewee) {
      const secret: string | undefined = process.env.JWT_SECRET;
      if (secret) {
        const token: string = jwt.sign(
          { _id: interviewee._id, userType: "interviewee" },
          secret
        );
        const IntervieweeWithoutPassword = { ...interviewee.toObject() };
        delete IntervieweeWithoutPassword.password;
        const expire = new Date(Date.now() + 3600000);

        res
          .cookie("interviewee_token", token, {
            httpOnly: true,
            expires: expire,
          })
          .status(200)
          .json(IntervieweeWithoutPassword);
      }
    } else {
      const password: string = generatePassword.generate({
        length: 8,
        numbers: true,
        symbols: true,
        uppercase: true,
        lowercase: true,
      });
      const hPass: string = await bcrypt.hash(password, 10);

      let user = await IntervieweeDB.create({
        email: email,
        name: displayName,
        profile_picture: photoURL,
        password: hPass,
      });

      const secret: string | undefined = process.env.JWT_SECRET;
      if (secret) {
        const token: string = jwt.sign(
          { _id: user._id, userType: "interviewee" },
          secret
        );
        const expire = new Date(Date.now() + 3600000);
        res
          .cookie("interviewee_token", token, {
            httpOnly: true,
            expires: expire,
          })
          .status(200)
          .json(user);
      }
    }
  } catch (error) {
    next(error);
  }
};
