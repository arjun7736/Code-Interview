import { Request, Response } from "express";
import { errorResponse } from "../utils/error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { isEmail, isStrongPassword } from "../utils/validator";
import { sentOTP } from "../utils/otp";
import { UserCollection, getUserCollection } from "../utils/selectDB";
import { ICompany, IInterviewee, IOtp } from "../interfaces/modelInterface";
import generatePassword from "generate-password";
import mongoose from "mongoose";
import { createForgotPasswordOTP, createOTPuser, deleteOTP, findUser, findUserWithOTP, getIndividualUserData, updateOTP } from "../repositories/userRepository";
import { createCompany, findCompany, findUserByName, updateCompanyPassword } from "../repositories/companyRepository";
import { createInterviewee, findInterviewee, getUserByEmail, updateIntervieweePassword } from "../repositories/intervieweeRepository";
import { createInterviewer } from "../repositories/interviewerRepository";

//<=----------------------Login----------------------=>//

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password)
      throw errorResponse(400, "Email and Password Required");

    const user = await findUser(email, role);

    if (!user) throw errorResponse(401, "There is no Account in Given E-mail");

    const passwordMatch: boolean = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      throw errorResponse(401, "Wrong Credentails");
    }

    if (user.isBlocked) throw errorResponse(403, "Account is Blocked");

    const secret: string | undefined = process.env.JWT_SECRET;
    if (secret) {
      const token = jwt.sign(
        { _id: user._id, isBlocked: user.isBlocked },
        secret
      );
      const expire = new Date(Date.now() + 3600000);
      const userWithoutPassword = { ...user.toObject() };
      delete userWithoutPassword.password;
      res
        .cookie(`${role}_token`, token, { httpOnly: true, expires: expire })
        .json(userWithoutPassword);
    }
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).send(error.message);
  }
};

//<=----------------------SignUp----------------------=>//
export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, password, confirmpassword, email, role } = req.body;
    if (!name || !password || !email || !confirmpassword)
      throw errorResponse(400, "Missing fields");

    if (password !== confirmpassword) {
      throw errorResponse(401, "Passwords do not match");
    }

    if (!isEmail(email)) {
      throw errorResponse(422, "Invalid email format");
    }

    if (!isStrongPassword(password)) {
      throw errorResponse(
        422,
        "Password must contain lowercase, uppercase, symbol, and number"
      );
    }

    const existingUser = await findUser(email, role);

    if (existingUser) {
      throw errorResponse(409, "Email already exists");
    }

    if (role === UserCollection.COMPANY) {
      const existName: ICompany | null = await findUserByName(
        name
      );

      if (existName) {
        throw errorResponse(409, "Company Name has been used.");
      }
    }
    const hashedPassword: string = await bcrypt.hash(password, 10);

    const otp: number = Math.floor(100000 + Math.random() * 900000);

    sentOTP(email, otp);

    const user = await createOTPuser(
      otp,
      hashedPassword,
      email,
      role,
      name
    );

    if (user) res.json({ Message: "OTP sent Successfully" });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).send(error.message);
  }
};

//<=----------------------Verify OTP----------------------=>//
export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, role, otp } = req.body;

    if (!otp) throw errorResponse(400, "Enter OTP");

    let data: IOtp | null = await findUserWithOTP(email, otp);
    console.log(data);
    if (!data) throw errorResponse(401, "Wrong OTP");

    switch (role) {
      case UserCollection.COMPANY:
        await createCompany(
          data.email,
          data.name || "",
          data.password || "",
          data.role || ""
        );
        await deleteOTP(data._id);
        break;
      case UserCollection.INTERVIEWEE:
        await createInterviewee(
          data.email,
          data.name || "",
          data.password || "",
          data.role || ""
        );
        await deleteOTP(data._id);
        break;
      case UserCollection.INTERVIEWER:
        await createInterviewer(
          data.email,
          data.password || "",
          data.name,
          data.role || ""
        );
        await deleteOTP(data._id);
        break;
    }
    res.json({ message: "OTP Verified Successfully" });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).send(error.message);
  }
};

//<=----------------------LogOut----------------------=>//
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    let tokenCookieName: string;

    if (req.cookies.company_token) {
      tokenCookieName = "company_token";
    } else if (req.cookies.interviewer_token) {
      tokenCookieName = "interviewer_token";
    } else if (req.cookies.interviewee_token) {
      tokenCookieName = "interviewee_token";
    } else if (req.cookies.admin_token) {
      tokenCookieName = "admin_token";
    } else {
      res.status(400).json({ message: "No active session found" });
      return;
    }
    res.clearCookie(tokenCookieName);
    res
      .status(200)
      .json({ message: "Logged out successfully!", user: tokenCookieName });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).send(error.message);
  }
};

//<=----------------------Forgot Password OTP----------------------=>//
export const forgotPasswordOTP = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, role } = req.body;

    let IsUserExist: ICompany | IInterviewee | null = null;

    if (role === UserCollection.COMPANY) {
      IsUserExist = await findCompany(email);
    } else {
      IsUserExist = await getUserByEmail(email);
    }
    if (!IsUserExist) throw errorResponse(404, "No User Found");

    const OTP: number = Math.floor(100000 + Math.random() * 900000);

    sentOTP(email, OTP);

    await createForgotPasswordOTP(email, OTP);

    res.json({ Message: "OTP sent Successfully" });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).send(error.message);
  }
};

//<=----------------------Forgot Password OTP----------------------=>//
export const verifyForgotPasswordOTP = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, otp, role } = req.body;

    let data: IOtp | null = await findUserWithOTP(email, otp);

    if (!data) throw errorResponse(400, "Invalied OTP");

    res.json({ email, role, messsage: "OTP Verified" });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).send(error.message);
  }
};

//<=----------------------creating New password----------------------=>//

export const createNewPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password, confirmpassword, role } = req.body;

    if (password !== confirmpassword)
      throw errorResponse(400, "Passwords do not match");

    let user: ICompany | IInterviewee | null = null;
    const hPass = await bcrypt.hash(password, 10);

    if (role == UserCollection.COMPANY) {
      user = await updateCompanyPassword(email, hPass);
    } else {
      user = await updateIntervieweePassword(email, hPass);
    }
    res.json({ Message: "Password Changes Successfully" });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).send(error.message);
  }
};

//<=----------------------Resent OTP----------------------=>//
export const resentOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, role } = req.body;
    const OTP: number = Math.floor(100000 + Math.random() * 900000);

    const user: IOtp | null = await updateOTP(email, OTP);
    if (!user) throw errorResponse(500, "Session Expired Please Signup Again");

    sentOTP(email, OTP);
    res.json({ message: "Otp Resent Successfully" });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).send(error.message);
  }
};

//<=----------------------Saving Google signin user----------------------=>//
export const googleSigninUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { displayName, email, photoURL } = req.body;

    const interviewee: IInterviewee | null =
      await findInterviewee(email);

    if (interviewee) {
      const secret: string | undefined = process.env.JWT_SECRET;
      if (secret) {
        const token: string = jwt.sign({ _id: interviewee._id }, secret);
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
      const role: string = "interviewee";
      const user = await createInterviewee(
        email,
        displayName,
        hPass,
        role,
        photoURL
      );

      const secret: string | undefined = process.env.JWT_SECRET;
      
      if (secret) {
        const token: string = jwt.sign({ _id: user?._id }, secret);
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
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).send(error.message);
  }
};

//<=----------------------Get Individual Data----------------------=>//

export const getIndividualData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const role: string | undefined = req?.userType;
    const id: string | undefined = req?.user._id;
    if (role && id) {
      const data: any | null = await getIndividualUserData(role, id);
      if (data) {
        const dataWithoutPassword = { ...data.toObject() };
        delete dataWithoutPassword.password;
        res.json(dataWithoutPassword);
      }
    }
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).send(error.message);
  }
};
