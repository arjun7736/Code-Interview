import { CompanyData } from "@/interface/userDataTypeInterface";
import { companyState } from "@/interface/userStateInterface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: companyState = {
  loading: false,
  error: null,
  companyData: null,
  interviewers:null
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.companyData = null;
    },
    loginSuccess: (state, action: PayloadAction<CompanyData>) => {
      state.loading = false;
      state.error = null;
      state.companyData = action.payload;
    },
    loginError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.companyData = null;
    },
    logout: () => initialState,
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
      state.companyData = null;
    },
    signupSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.companyData = null;
    },
    signupError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.companyData = null;
    },
    interviewersStart:(state)=>{
        state.loading=true
        state.error =null
        state.interviewers=null
    },
    interviewersSuccess:(state,action:PayloadAction<[]>)=>{
        state.loading=false
        state.error =null
        state.interviewers=action.payload
    },
    interviewersError:(state,action:PayloadAction<string>)=>{
        state.loading =false
        state.error=action.payload
        state.interviewers=null
    }
  },
});

export const {
  loginStart,
  loginError,
  loginSuccess,
  signupError,
  signupStart,
  signupSuccess,
  interviewersStart,
  interviewersError,
  interviewersSuccess,
  logout
} = companySlice.actions;

export default companySlice.reducer;
