import mongoose, { Schema, Document } from "mongoose";

 export interface ICompany extends Document {
    email: string;
    password: string;
    name?: string;
    profile_picture?: string;
    isBlocked?: boolean;
    isPremium?:boolean,
    role?:string; 
}

const CompanySchema: Schema = new Schema<ICompany>({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isPremium:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:"company"
    }
});

const Company = mongoose.model<ICompany>("Company", CompanySchema);
export default Company;
