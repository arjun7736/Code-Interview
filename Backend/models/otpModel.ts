import mongoose, { Schema, Document } from "mongoose";

export interface IOtp extends Document {
  email: string;
  password: string;
  otp: number;
  name?: string;
}
const OTPSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required:true
  },
  name:{
    type:String
  }
});

const OTP = mongoose.model<IOtp>("OTP",OTPSchema)
export default OTP;