import { AdminData,  CompanyData, IntervieweeData, InterviewerData } from "@/interface/userDataTypeInterface";
import { AdminState } from "@/interface/userStateInterface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState: AdminState = {
  loading: false,
  adminData: null,
  error: null,
  premiumCompanies:null,
  companyData: null,
  interviewerData: null,
  intervieweeData: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.adminData = null;
    },
    loginSuccess: (state, action: PayloadAction<AdminData>) => {
      state.loading = false;
      state.adminData = action.payload;
      state.error = null;
    },
    loginError: (state, action: PayloadAction<string>) => {
      (state.loading = false), 
      (state.adminData = null);
      state.error = action.payload;
    },
    setCompanyData: (state, action: PayloadAction<CompanyData>) => {
      state.loading = false;
      state.companyData = action.payload;
      state.error = null;
    },
    setInterviewerData: (state, action: PayloadAction<InterviewerData>) => {
      state.interviewerData = action.payload;
      state.loading = false;
      state.error = null;
    },
    setIntervieweeData: (state, action: PayloadAction<IntervieweeData>) => {
      state.intervieweeData = action.payload;
      state.loading = false;
      state.error = null;
    },
    setPremiumCompanies:(state,action:PayloadAction<CompanyData>)=>{
      state.premiumCompanies=action.payload
      state.loading = false;
      state.error = null;
    },
    logout: () => initialState,
  },
});

export const {
  loginStart,
  loginSuccess,
  loginError,
  setCompanyData,
  setIntervieweeData,
  setInterviewerData,
  setPremiumCompanies,
  logout
} = adminSlice.actions;

export default adminSlice.reducer;
