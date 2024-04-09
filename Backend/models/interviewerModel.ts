import mongoose, { Schema, Document } from "mongoose";

export interface IInterviewer extends Document {
  email: string;
  password: string;
  profile_picture: string;
  name: string;
  isBlocked: boolean;
  company: string;
}

const InterviewerSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
  },
  isBlocked: {
    type: Boolean,
  },
});

const Interviewer =mongoose.model<IInterviewer>("Interviewer",InterviewerSchema)
export default  Interviewer;