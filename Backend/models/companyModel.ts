import mongoose, { Schema, Document } from "mongoose";

 export interface ICompany extends Document {
    email: string;
    password: string;
    name: string;
    profile_picture?: string;
    isBlocked?: boolean;
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
    }
});

const Company = mongoose.model<ICompany>("Company", CompanySchema);
export default Company;
