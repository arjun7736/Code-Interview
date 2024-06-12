/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import mongoose,{Schema} from "mongoose"
import { IInterviewee } from "../interfaces/modelInterface"



const intervieweeSchema:Schema = new Schema<IInterviewee>({
    email:{
        type:String, 
        required:true
    },
    name:{
        type:String, 
    },
    password:{
        type:String,
    },
    profile_picture:{
        type:String
    },
    isBlocked:{
        type:Boolean
    },
    role:{
        type:String,
        default:"interviewee"
    }
})

const Interviewee =mongoose.model<IInterviewee>("interviewee",intervieweeSchema)
export default Interviewee