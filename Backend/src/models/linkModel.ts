/* eslint-disable @typescript-eslint/naming-convention */
import mongoose, { Schema } from "mongoose";
import { ILink } from "../interfaces/modelInterface";

const LinkSchema:Schema= new Schema<ILink>({
    meetingLink:{
        type:String
    },
    questionSet:{
        type:String
    },
    createdAt: {
        type:Date,
        default:Date.now,
        expires:"60m"
      },
})

const Link = mongoose.model<ILink>("Link",LinkSchema)
export default Link;