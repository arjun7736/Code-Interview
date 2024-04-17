import mongoose, { Schema, Document } from "mongoose";

export interface IOtp extends Document {
  email: string;
  password?: string;
  otp?: number;
  name?: string;
  createdAt?: Date; 
  company?: mongoose.Types.ObjectId; 
}
const OTPSchema = new Schema({
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
    expires:300
  },
  company: {
    type: mongoose.Types.ObjectId, 
    ref: 'Company',
  }
});

const OTP = mongoose.model<IOtp>("OTP",OTPSchema)
export default OTP;