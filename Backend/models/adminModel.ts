import mongoose,{Schema,Document} from "mongoose"

export interface IAdmin extends Document{
    email:string;
    password:string;
    profile_picture:string;
    name:string;
    role?:string; 

}

const AdminSchema= new Schema({
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