import { Request, Response } from "express";
import {
  IInterviewee,
} from "../interfaces/modelInterface";
import { findInterviewee } from "../repositories/intervieweeRepository";
import { ErrorResponse } from "../interfaces/errorInterface";
import {
  clearPassword,
  createGoogleUserService,
  createNewPasswordService,
  createToken,
  forgotPasswordOTPService,
  getIndividualUserService,
  logoutService,
  otpService,
  resendOtpService,
  signUpService,
  userLoginService,
  verifyForgotPasswordOTPService,
} from "../services/authServices";
import { errorResponse } from "../utils/error";
import { StatusCode } from "../utils/selectDB";



//<=----------------------Login----------------------=>//

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, role } = req.body;
    if(!email || !password) throw errorResponse(400, "Email or Password is required");

    const user = await userLoginService(email, password, role);
    const token = createToken(user._id, user.isBlocked);
    const expire = new Date(Date.now() + 3600000);

    res
      .cookie(`${role}_token`, token, { httpOnly: true, expires: expire ,sameSite: 'none',secure:false})
      .json(user);
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

//<=----------------------SignUp----------------------=>//
export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, password, confirmpassword, email, role } = req.body;

    await signUpService(name, password, confirmpassword, email, role);
    res.json({ Message: "OTP sent Successfully" });
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

//<=----------------------Verify OTP----------------------=>//
export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, role, otp } = req.body;

    otpService(email, role, otp);

    res.json({ message: "OTP Verified Successfully" });
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

//<=----------------------LogOut----------------------=>//
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const tokenCookieName = await logoutService(req);
    res.clearCookie(tokenCookieName);
    res
      .status(200)
      .json({ message: "Logged out successfully!", user: tokenCookieName });
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

//<=----------------------Forgot Password OTP----------------------=>//
export const forgotPasswordOTP = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, role } = req.body;

    await forgotPasswordOTPService(email, role);

    res.json({ Message: "OTP sent Successfully" });
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

//<=----------------------Forgot Password OTP----------------------=>//
export const verifyForgotPasswordOTP = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, otp } = req.body;

    await verifyForgotPasswordOTPService(email, otp);

    res.json({ messsage: "OTP Verified" });
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

//<=----------------------creating New password----------------------=>//

export const createNewPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password, confirmpassword, role } = req.body;

    createNewPasswordService(email, password, confirmpassword, role);
 
    res.json({ Message: "Password Changes Successfully" });
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

//<=----------------------Resent OTP----------------------=>//
export const resentOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    await resendOtpService(email);

    res.json({ message: "Otp Resent Successfully" });
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

//<=----------------------Saving Google signin user----------------------=>//

export const googleSigninUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { displayName, email, photoURL } = req.body;
    const interviewee: IInterviewee | null = await findInterviewee(email);

    let intervieweeData: IInterviewee | null = interviewee;

    if (!interviewee) {
      intervieweeData = await createGoogleUserService(
        displayName,
        email,
        photoURL
      );
      if (!intervieweeData) throw errorResponse(StatusCode.SERVER_ERROR, "Error in sign-up");
    }
    if (intervieweeData) {
      const token: string = createToken(intervieweeData._id);
      const intervieweeWithoutPassword = clearPassword(intervieweeData);
      const expire = new Date(Date.now() + 3600000);

      res
        .cookie("interviewee_token", token, {
          httpOnly: true,
          expires: expire,
        })
        .status(200)
        .json(intervieweeWithoutPassword);
    }
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};

//<=----------------------Get Individual Data----------------------=>//

export const getIndividualData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const role: string | undefined = req?.userType;
    const id: string | undefined = req?.user?._id;
    if (!role || !id) {
      throw errorResponse(StatusCode.SERVER_ERROR, 'Cant Find ID');
    }
    
    const data = await getIndividualUserService(role, id);
    if (!data) {
      res.status(StatusCode.NOT_FOUND).json({ message: 'User not found' });
    } else {
      res.json(data);
    }
  
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
    res.status(statusCode).send(customError.message);
  }
};
