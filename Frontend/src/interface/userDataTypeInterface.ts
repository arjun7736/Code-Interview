
export interface AdminData {
  _id: string;
  email: string;
}
export interface TempData{
  email:string,
  role:string
}
export interface IntervieweeData {
  _id: string;
  email: string;
  isBlocked: boolean;
  role: string;
  name?: string;
  profile_picture?: string;
}
export interface InterviewerData extends IntervieweeData {
  company: string;
}
export interface CompanyData extends IntervieweeData {
  isPremium: boolean;
}
