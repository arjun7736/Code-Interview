import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../utils/error";
import { isEmail, isStrongPassword } from "../utils/validator";
import CompanyDB, { ICompany } from "../models/companyModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


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

    const user: ICompany | null = await CompanyDB.findOne({ email });
    if (!user) return next(errorHandler(401, "User not found"));

    const isValidPassword: boolean = await bcrypt.compare(password,user.password);
    if (!isValidPassword) return next(errorHandler(401, "Wrong Credentails"));

    const secret: string | undefined = process.env.JWT_SECRET;
    if(secret){
           const token = jwt.sign({_id:user._id}, secret);
           res.json({user,token});
    }

  } catch (error) {
    return next(error);
  }
};
