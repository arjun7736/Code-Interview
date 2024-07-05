/* eslint-disable @typescript-eslint/naming-convention */
import mongoose, { Schema } from "mongoose";
import { IMeeting } from "../interfaces/modelInterface";

const MeetingSchema: Schema = new Schema<IMeeting>({
  meetingLink: {
    type: String,
  },
  company: { type: String },

  Interviewee: {
    type: String,
  },
  Interviewer: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    index: { expires: 0 },
  },
});

const MeetingLink = mongoose.model<IMeeting>("Meeting", MeetingSchema);
export default MeetingLink;
