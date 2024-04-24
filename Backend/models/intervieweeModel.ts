import mongoose,{Schema,Document} from "mongoose"

export interface IInterviewee extends Document{
    email?:string;
    password?:string|null;
    name?:string;
    profile_picture?:string;
    isBlocked?:boolean
    role?:string; 

}
const intervieweeSchema = new Schema({
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