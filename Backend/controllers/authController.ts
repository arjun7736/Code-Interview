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

    if (company.isBlocked) return next(errorHandler(403, "Account is Blocked"));

    const secret: string | undefined = process.env.JWT_SECRET;
    if (secret) {
      const token = jwt.sign({ _id: company._id, userType: "company" }, secret);
      const expire = new Date(Date.now() + 3600000);

      const companyWithoutPassword = { ...company.toObject() };
      delete companyWithoutPassword.password;
      res
        .cookie("company_token", token, { httpOnly: true, expires: expire })
        .status(200)
        .json(companyWithoutPassword);
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

    if (!interviewer) return next(errorHandler(404, "Account Not Found"));

    const isValiedPassword: boolean = await bcrypt.compare(
      password,
      interviewer.password
    );

    if (!isValiedPassword)
      return next(errorHandler(401, "invalied  Credentials"));

    if (interviewer.isBlocked)
      return next(errorHandler(403, "Account is Blocked"));

    const secret: string | undefined = process.env.JWT_SECRET;

    if (secret) {
      const token: string = jwt.sign(
        { _id: interviewer._id, userType: "interviewer" },
        secret
      );

      const expire = new Date(Date.now() + 3600000);

      const interviewerWithoutPassword = { ...interviewer.toObject() };
      delete interviewerWithoutPassword.password;

      res
        .cookie("interviewer_token", token, { httpOnly: true, expires: expire })
        .status(200)
        .json(interviewerWithoutPassword);
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

      const adminWithoutPassword = { ...admin.toObject() };
      delete adminWithoutPassword.password;

      res
        .cookie("admin_token", token, { httpOnly: true, expires: expire })
        .status(200)
        .json(adminWithoutPassword);
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

    if (Interviewee.password) {
      const isValiedPassword: Boolean = await bcrypt.compare(
        password,
        Interviewee.password
      );
      if (!isValiedPassword)
        return next(errorHandler(401, "Wrong Credentials"));
    }

    if (Interviewee.isBlocked)
      return next(errorHandler(403, "Account is Blocked"));

    const secret: string | undefined = process.env.JWT_SECRET;

    if (secret) {
      const token: string = jwt.sign(
        { _id: Interviewee._id, userType: "interviewee" },
        secret
      );

      const expire = new Date(Date.now() + 3600000);

      const IntervieweeWithoutPassword = { ...Interviewee.toObject() };
      delete IntervieweeWithoutPassword.password;

      res
        .cookie("interviewee_token", token, { httpOnly: true, expires: expire })
        .status(200)
        .json(IntervieweeWithoutPassword);
    }
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
