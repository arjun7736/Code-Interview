import {
  AdminData,
  CompanyData,
  IntervieweeData,
  InterviewerData,
  TempData,
} from "./userDataTypeInterface";

export interface AdminState {
  loading: boolean;
  adminData: AdminData | null;
  error: string | null;
  premiumCompanies:CompanyData []|null
  companyData: CompanyData []| null;
  interviewerData: InterviewerData []| null;
  intervieweeData: IntervieweeData []| null;
}

export interface companyState {
  loading: boolean;
  error: string | null;
  companyData: CompanyData | null;
  interviewers: [] | null;
}

export interface intervieweeState {
  loading: boolean;
  error: string | null;
  intervieweeData: IntervieweeData | null;
  profile_picture?:string
}

export interface interviewerState {
  loading: boolean;
  error: string | null;
  interviewerData: InterviewerData | null;
}

export interface tempState {
  loading: boolean;
  error: null | string;
  userRole:TempData|null
}
