import { errorResponse } from "../utils/error";
import { StatusCode } from "../utils/selectDB";
import { isEmail, isStrongPassword } from "../utils/validator";

//<=----------------------Login Validator----------------------=>//
export const validateLoginData = (email: string, password: string) => {
  if (!email || !password)
    throw errorResponse(StatusCode.BAD_REQUEST, "Email and Password Required");

  if (!isEmail(email)) {
    throw errorResponse(StatusCode.FORBIDDEN, "Invalid email format");
  }
};

//<=----------------------SIgnUp Validator----------------------=>//

export const validateSignupData = (
  name: string,
  password: string,
  confirmpassword: string,
  email: string
) => {
  if (!name || !password || !confirmpassword || !email) {
    throw errorResponse(StatusCode.BAD_REQUEST, "Missing fields");
  }

  if (!isEmail(email)) {
    throw errorResponse(StatusCode.FORBIDDEN, "Invalid email format");
  }
  passwordValidator(password, confirmpassword);
};

//<=----------------------OTP Validator----------------------=>//
export const otpValidator = (otp: number) => {
  if (!otp) throw errorResponse(StatusCode.BAD_REQUEST, "Enter OTP");
  if (otp.toString().length != 6)
    throw errorResponse(StatusCode.BAD_REQUEST, "Enter all the Digits ");
};

//<=----------------------Password Validator----------------------=>//
export const passwordValidator = (
  password: string,
  confirmpassword: string
) => {
  if (!password || !confirmpassword) {
    throw errorResponse(StatusCode.BAD_REQUEST, "Missing Fields");
  }
  if (password !== confirmpassword) {
    throw errorResponse(StatusCode.UNOTHERIZED, "Passwords are Not Matching");
  }
  if (!isStrongPassword(password)) {
    throw errorResponse(
      422,
      "Password must contain lowercase, uppercase, symbol, and number"
    );
  }
};
