import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../utils/error";
import { isEmail, isStrongPassword } from "../utils/validator";
import CompanyDB, { ICompany } from "../models/companyModel";
import InterviewerDB, { IInterviewer } from "../models/interviewerModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AdminDB, { IAdmin } from "../models/adminModel";

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
    const new_company: ICompany = await CompanyDB.create({
      name,
      password: HashedPassword,
      email,
    });
    // remove password
    res.json(new_company);
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
//<=...............................interviewee........................=>//

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
