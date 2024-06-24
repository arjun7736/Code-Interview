import { Request } from "express";
import {
  IAdmin,
  ICompany,
  IInterviewee,
  IInterviewer,
  IOtp,
} from "../interfaces/modelInterface";
import {
  createForgotPasswordOTP,
  createOTPuser,
  deleteOTP,
  findUser,
  findUserWithOTP,
  getIndividualUserData,
  updateOTP,
} from "../repositories/userRepository";
import { errorResponse } from "../utils/error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Role, StatusCode } from "../utils/selectDB";
import {
  createCompany,
  findCompany,
  findUserByName,
  updateCompanyPassword,
} from "../repositories/companyRepository";
import {
  otpValidator,
  passwordValidator,
  validateLoginData,
  validateSignupData,
} from "../helperFunctions/authValidator";
import { sentOTP } from "../utils/otp";
import {
  createInterviewee,
  getUserByEmail,
  updateIntervieweePassword,
} from "../repositories/intervieweeRepository";
import { createInterviewer } from "../repositories/interviewerRepository";
import generatePassword from "generate-password";
import { ErrorResponse } from "@/interfaces/errorInterface";

//<=----------------------Login Service----------------------=>//

export const userLoginService = async (
  email: string,
  password: string,
  role: string
) => {
  try {
    if(!email || !password) throw errorResponse(400, "Email or Password is required");
    validateLoginData(email, password);

    const user = await findUser(email, role);

    if (!user)
      throw errorResponse(
        StatusCode.UNOTHERIZED,
        "No Account Found Check Credentials"
      );

    if (typeof user.password !== "string") {
      throw errorResponse(StatusCode.UNOTHERIZED, "Invalid password format");
    }
    const passwordMatch: boolean = await bcrypt.compare(
      password,
      user.password
    );
    if (!passwordMatch) {
      throw errorResponse(
        StatusCode.UNOTHERIZED,
        "No Account Found Check Credentials"
      );
    }
    if (user.isBlocked)
      throw errorResponse(StatusCode.FORBIDDEN, "Account is Blocked");

    const userWithoutPassword = clearPassword(user);

    return userWithoutPassword;
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Login");
  }
};

//<=----------------------Creating Token Service----------------------=>//

export const createToken = (id: string, isBlocked?: boolean): string => {
  try {
    const secret: string | undefined = process.env.JWT_SECRET;
    if (!secret) {
      throw errorResponse(StatusCode.SERVER_ERROR, "Secret Missing");
    }
    return jwt.sign({ _id: id, isBlocked }, secret);
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Creating Token");
  }
};

//<=----------------------Clear Password Service----------------------=>//

export const clearPassword = (
  user: IInterviewee | IInterviewer | ICompany | IAdmin
) => {
  try {
    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Clear the Password");
  }
};

//<=----------------------SignUp Service----------------------=>//

export const signUpService = async (
  name: string,
  password: string,
  confirmpassword: string,
  email: string,
  role: string
) => {
  try {
    validateSignupData(name, password, confirmpassword, email);

    const existingUser = await findUser(email, role);

    if (existingUser) {
      throw errorResponse(409, "Email already exists");
    }
    if (role === Role.COMPANY) {
      const existName: ICompany | null = await findUserByName(name);

      if (existName) {
        throw errorResponse(409, "Company Name has been used.");
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000);
    await sentOTP(email, otp);
    await createOTPuser(otp, hashedPassword, email, role, name);
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While SignUp");
  }
};

//<=----------------------Verify OTP Service----------------------=>//
export const otpService = async (email: string, role: string, otp: number) => {
  try {
    otpValidator(otp);

    const data: IOtp | null = await findUserWithOTP(email, otp);

    if (!data) throw errorResponse(StatusCode.UNOTHERIZED, "Wrong OTP");

    switch (role) {
      case Role.COMPANY:
        await createCompany(
          data.email,
          data.name || "",
          data.password || "",
          data.role || ""
        );
        await deleteOTP(data._id);
        break;
      case Role.INTERVIEWEE:
        await createInterviewee(
          data.email,
          data.name || "",
          data.password || "",
          data.role || ""
        );
        await deleteOTP(data._id);
        break;
      case Role.INTERVIEWER:
        await createInterviewer(
          data.email,
          data.password || "",
          data.name,
          data.role || ""
        );
        await deleteOTP(data._id);
        break;
    }
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Verify OTP");
  }
};

//<=----------------------getToken Service----------------------=>//
export const logoutService = async (req: Request): Promise<string> => {
  try {
    if (req.cookies.company_token) {
    return "company_token";
  } else if (req.cookies.interviewer_token) {
    return "interviewer_token";
  } else if (req.cookies.interviewee_token) {
    return "interviewee_token";
    } else if (req.cookies.admin_token) {
      return "admin_token";
    } else {
      throw errorResponse(StatusCode.BAD_REQUEST, "No active session found");
    }
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Logout");
  }
};

//<=----------------------Forgot Password Service----------------------=>//
export const forgotPasswordOTPService = async (
  email: string,
  role: Role
): Promise<void> => {
  try {
    let user: ICompany | IInterviewee | null = null;
  
    if (role === Role.COMPANY) {
      user = await findCompany(email);
    } else {
      user = await getUserByEmail(email);
    }
  
    if (!user) {
      throw errorResponse(StatusCode.NOT_FOUND, "No User Found");
    }
  
    const OTP = Math.floor(100000 + Math.random() * 900000);
    await sentOTP(email, OTP);
    await createForgotPasswordOTP(email, OTP);
    
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While forgot password OTP service");
  }
};

//<=----------------------Forgot Password verify otp Service----------------------=>//

export const verifyForgotPasswordOTPService = async (
  email: string,
  otp: number
): Promise<void> => {
  try {
    otpValidator(otp);
    const data = await findUserWithOTP(email, otp);
    if (!data) {
      throw errorResponse(StatusCode.BAD_REQUEST, "Invalid OTP");
    }
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Verify Forgot Password");
  }
};

//<=----------------------Create new Password Service----------------------=>//
export const createNewPasswordService = async (
  email: string,
  password: string,
  confirmpassword: string,
  role: Role
): Promise<void> => {

  try {
    passwordValidator(password, confirmpassword);
  
    const hashedPassword = await bcrypt.hash(password, 10);
    let user: ICompany | IInterviewee | null = null;
  
    if (role === Role.COMPANY) {
      user = await updateCompanyPassword(email, hashedPassword);
    } else {
      user = await updateIntervieweePassword(email, hashedPassword);
    }
    if (!user) {
      throw errorResponse(StatusCode.SERVER_ERROR, "Something went wrong!");
    }
    
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Create a new Password");
  }
};

//<=----------------------Resent OTP Service----------------------=>//
export const resendOtpService = async (email: string): Promise<void> => {
  try {
    const OTP = Math.floor(100000 + Math.random() * 900000);
    await sentOTP(email, OTP);
    const user = await updateOTP(email, OTP);
    if (!user) {
      throw errorResponse(
        StatusCode.UNOTHERIZED,
        "Session Expired. Please Sign Up Again"
      );
    }
    
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While resend OTP");
  }
};

//<=----------------------google Signin Service----------------------=>//

export const createGoogleUserService = async (
  email: string,
  displayName: string,
  photoURL?: string
): Promise<IInterviewee | null> => {
  try {
    const password: string = generatePassword.generate({
      length: 8,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
    });
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const role: string = "interviewee";
    const interviewee = await createInterviewee(
      email,
      displayName,
      hashedPassword,
      role,
      photoURL
    );
    return interviewee;
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While Create new User");
  }
};

//<=----------------------get Individual Data Service----------------------=>//

export const getIndividualUserService = async (
  role: string,
  id: string
): Promise<ICompany | IInterviewer | IInterviewer | null> => {
  try {
    const data = await getIndividualUserData(role, id);
    if (data) {
      delete data.password;
    }
    return data;
  } catch (error) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    throw errorResponse(statusCode, "Error While get individaul data");
  }
};
