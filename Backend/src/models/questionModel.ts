/* eslint-disable @typescript-eslint/naming-convention */
import mongoose, { Schema } from "mongoose";
import { IQuestion } from "../interfaces/modelInterface";

const QuestionSchema: Schema = new Schema<IQuestion>({
  questionSet: {
    type: Number,
  },
  questions: [
    {
      question: { type: String },
      options: [{ type: String }],
      rightOption: String,
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "interviewer",
  },
  attentedInterviewees: [
    {
      interviewee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "interviewee",
      },
      result:{
        type:String
      },
      date:{
        type:Date,
        default:Date.now
      }
    },
  ],
});

const Question = mongoose.model<IQuestion>("Question", QuestionSchema);
export default Question;
