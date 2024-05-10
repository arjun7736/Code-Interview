import { errorResponse } from "../utils/error";
import { isEmail, isStrongPassword } from "../utils/validator";

//<=----------------------Login Validator----------------------=>//
export const validateLoginData = (email: string, password: string) => {
  if (!email || !password)
    throw errorResponse(400, "Email and Password Required");

  if (!isEmail(email)) {
    throw errorResponse(422, "Invalid email format");
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
    throw errorResponse(400, "Missing fields");
  }

  if (!isEmail(email)) {
    throw errorResponse(422, "Invalid email format");
  }
  passwordValidator(password, confirmpassword);
};

//<=----------------------OTP Validator----------------------=>//
export const otpValidator = (otp: number) => {
  if (!otp) throw errorResponse(400, "Enter OTP");
  if (otp.toString().length != 6)
    throw errorResponse(402, "Enter all the Digits ");
};

//<=----------------------Password Validator----------------------=>//
export const passwordValidator = (
  password: string,
  confirmpassword: string
) => {
  if (!password || !confirmpassword) {
    throw errorResponse(400, "Missing Fields");
  }
  if (password !== confirmpassword) {
    throw errorResponse(401, "Passwords are Not Matching");
  }
  if (!isStrongPassword(password)) {
    throw errorResponse(
      422,
      "Password must contain lowercase, uppercase, symbol, and number"
    );
  }
};
