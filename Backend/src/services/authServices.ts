import { findUser } from "../repositories/userRepository";
import { errorResponse } from "../utils/error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"





export const userLoginService = async (
  email: string,
  password: string,
  role: string
) => {
  const user = await findUser(email, role);
  if (!user) throw errorResponse(401, "No Account Found Check Credentials");

  const passwordMatch: boolean = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw errorResponse(401, "No Account Found Check Credentials");
  }
  if (user.isBlocked) throw errorResponse(403, "Account is Blocked");
  return user;
};


export const createToken=(id:string,isBlocked:boolean):string=>{
    const secret: string | undefined = process.env.JWT_SECRET  
    if(!secret){
    throw errorResponse(500,"Secret Missing")
    }
    return jwt.sign({_id:id,isBlocked},secret)
}