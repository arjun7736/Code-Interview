import mongoose from "mongoose"

const CompanyModel=({
    email:{
        type:String, 
        required:true
    },
    password:{
        type: String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    profile_picture:{
        type:String,
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
})