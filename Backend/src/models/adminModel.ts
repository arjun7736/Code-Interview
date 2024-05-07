import mongoose,{Schema,Document} from "mongoose"
import { IAdmin } from "../interfaces/modelInterface";



const AdminSchema:Schema= new Schema<IAdmin>({
    email:{
        type:String, 
        required:true
    },
    name:{
        type: String,
    },
    password:{
        type:String, 
        required:true
    },
    profile_picture:{
        type:String,
    },
    role:{
        type:String,
        default:"admin"
    }

})

 const Admin = mongoose.model<IAdmin>("Admin",AdminSchema)
 export default  Admin;