import mongoose, { Schema, Document } from "mongoose";
import { IOtp } from "../interfaces/modelInterface";


const OTPSchema:Schema = new Schema<IOtp>({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  otp: {
    type: Number,
  },
  name:{
    type:String
  },
  createdAt: {
    type:Date,
    default:Date.now(),
    expires:"5m"
  },
  company: {
    type: mongoose.Types.ObjectId, 
    ref: 'Company',
  },
  role:{
    type:String
  }
});

const OTP = mongoose.model<IOtp>("OTP",OTPSchema)
export default OTP;