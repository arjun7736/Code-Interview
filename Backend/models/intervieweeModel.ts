import mongoose,{Schema,Document} from "mongoose"

export interface IInterviewee extends Document{
    email:string;
    password:string;
    name:string;
    profile_picture:string;
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
        required:true
    },
    profile_picture:{
        type:String
    }
})

const Interviewee =mongoose.model<IInterviewee>("interviewee",intervieweeSchema)
export default Interviewee