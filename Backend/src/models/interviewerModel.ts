import mongoose, { Schema } from "mongoose";
import { IInterviewer } from "../interfaces/modelInterface";

const InterviewerSchema:Schema = new Schema<IInterviewer>({
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
  company:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  },
  role:{
    type:String,
    default:"interviewer"
}
});

const Interviewer =mongoose.model<IInterviewer>("Interviewer",InterviewerSchema)
export default  Interviewer;