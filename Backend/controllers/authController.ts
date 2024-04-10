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

//<=...............................company........................=>//

export const companySignup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, password, confirmpassword, email } = req.body;

    if (!name || !password || !email || !confirmpassword)
      return next(errorHandler(400, "Missing fields"));

    if (password !== confirmpassword)
      return next(errorHandler(401, "Passwords Not Matching"));

    if (!isEmail(email)) return next(errorHandler(422, "Invalid Email Format"));

    if (!isStrongPassword(password))
      return next(
        errorHandler(
          422,
          "Password Must contain Small,Capital letters ,Symbol & number"
        )
      );

    const Exist_email: ICompany | null = await CompanyDB.findOne({ email });

    if (Exist_email) return next(errorHandler(401, "Email Already Registered"));

    const exist_name: ICompany | null = await CompanyDB.findOne({ name });

    if (exist_name)
      return next(errorHandler(401, "Company Name already Registered"));

    const HashedPassword: string = await bcrypt.hash(password, 10);

    const otp: number = Math.floor(1000 + Math.random() * 900000);

    sentOTP(email, otp);
    await OTPDB.create({
      name,
      password: HashedPassword,
      otp: otp,
      email,
    });

    res.json({ email, userType: "Company" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const companyLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(errorHandler(400, "Please provide all details"));

    const company: ICompany | null = await CompanyDB.findOne({ email });
    if (!company) return next(errorHandler(401, "company not found"));

    const isValidPassword: boolean = await bcrypt.compare(
      password,
      company.password
    );
    if (!isValidPassword) return next(errorHandler(401, "Wrong Credentails"));

    const secret: string | undefined = process.env.JWT_SECRET;
    if (secret) {
      const token = jwt.sign({ _id: company._id, userType: "company" }, secret);
      const expire = new Date(Date.now() + 3600000);
      // remove password

      res
        .cookie("company_token", token, { httpOnly: true, expires: expire })
        .status(200)
        .json(company);
    }
  } catch (error) {
    return next(error);
  }
};

//<=...............................Interviewer........................=>//

export const interviewerLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(errorHandler(400, "Must Fill all the Field"));

    const interviewer: IInterviewer | null = await InterviewerDB.findOne({
      email,
    });

    if (!interviewer) return next(errorHandler(404, "User Not Found"));

    const isValiedPassword: boolean = await bcrypt.compare(
      password,
      interviewer.password
    );

    if (isValiedPassword)
      return next(errorHandler(401, "invalied  Credentials"));

    const secret: string | undefined = process.env.JWT_SECRET;

    if (secret) {
      const token: string = jwt.sign(
        { _id: interviewer._id, userType: "interviewer" },
        secret
      );

      const expire = new Date(Date.now() + 3600000);
      // remove password
      res
        .cookie("interviewer_token", token, { httpOnly: true, expires: expire })
        .status(200)
        .json(interviewer);
    }
  } catch (error) {
    next(error);
  }
};

//<=...............................Admin........................=>//

export const adminLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(errorHandler(400, "Fill all the Field"));

    const admin: IAdmin | null = await AdminDB.findOne({ email });

    if (!admin) return next(errorHandler(404, "user not found"));

    const isValiedPassword: boolean = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isValiedPassword)
      return next(errorHandler(401, "Invalid Credentials"));

    const secret: string | undefined = process.env.JWT_SECRET;

    if (secret) {
      const token = jwt.sign({ _id: admin._id, userType: "admin" }, secret);
      const expire = new Date(Date.now() + 3600000);
      // remove password
      res
        .cookie("admin_token", token, { httpOnly: true, expires: expire })
        .status(200)
        .json(admin);
    }
  } catch (error) {
    next(error);
  }
};
//<=...............................Interviewee........................=>//
export const intervieweeLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(errorHandler(400, "Email and Password are required"));

    const Interviewee: IInterviewee | null = await IntervieweeDB.findOne({
      email: email,
    });

    if (!Interviewee) return next(errorHandler(404, "User Not Found"));

    const isValiedPassword: Boolean = await bcrypt.compare(
      password,
      Interviewee.password
    );

    if (!isValiedPassword) return next(errorHandler(401, "Wrong Credentials"));

    const secret: string | undefined = process.env.JWT_SECRET;

    if (secret) {
      const token: string = jwt.sign(
        { _id: Interviewee._id, userType: "interviewee" },
        secret
      );

      const expire = new Date(Date.now() + 3600000);

      res
        .cookie("interviewee_token", token, { httpOnly: true, expires: expire })
        .status(200)
        .json(Interviewee);
    }
  } catch (error) {
    next(error);
  }
};

export const intervieweeSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { name, email, password,confirmpassword } = req.body;
    if(!name||!email||!password) return next(errorHandler(400,"Missing Fields"))
    
    if(password!=confirmpassword) return next(errorHandler(400,'Passwords do not match'))
    
    if(!isEmail(email)) return next(errorHandler(400,"Invalid Email Format"))
    
    if(!isStrongPassword(password)) return next(errorHandler(400,"Weak Password"))

    const exist:IInterviewee|null= await IntervieweeDB.findOne({email:email})
    if(exist) return next(errorHandler(409,"User already Exist "))
  
    const HashedPassword:string =await bcrypt.hash(password,10)
    const OTP:number =Math.floor(100000+Math.random()*900000) 
    sentOTP(email,OTP)
    await OTPDB.create({
      name,
      password:HashedPassword,
      email,
      otp:OTP
    })
  } catch (error) {
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
    const { email, userType, otp } = req.body;

    let data: IOtp | null = null;

    if (!otp) return next(errorHandler(400, "Enter OTP"));

    data = await OTPDB.findOne({ email: email, otp: otp });

    switch (userType) {
      case "Company":
        await CompanyDB.create({
          email: data?.email,
          password: data?.password,
          name: data?.name,
        });
        break;
      case "Interviewer":
        await InterviewerDB.create({
          email: data?.email,
          password: data?.password,
          name: data?.name,
        });
        break;
      case "Interviewee":
        await IntervieweeDB.create({
          email: data?.email,
          password: data?.password,
          name: data?.name,
        });
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
  } else {
    res.status(400).json({ message: "No active session found" });
    return;
  }
  res.clearCookie(tokenCookieName);
  res
    .status(200)
    .json({ message: "Logged out successfully!", user: tokenCookieName });
};
