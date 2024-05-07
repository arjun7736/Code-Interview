import { InterviewerData } from "@/interface/userDataTypeInterface";
import { interviewerState } from "@/interface/userStateInterface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";



const initialState: interviewerState = {
  loading: false,
  error: null,
  interviewerData: null,
};

export const interviewerSlice = createSlice({
  name: "interviewer",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.interviewerData = null;
    },
    loginSuccess: (state, action: PayloadAction<InterviewerData>) => {
      state.loading = false;
      state.error = null;
      state.interviewerData = action.payload;
    },
    loginError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.interviewerData = null;
    },
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
      state.interviewerData = null;
    },
    signupSuccess: (state) => {
      state.error = null;
      state.loading = false;
      state.interviewerData = null;
    },
    signupError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.interviewerData = null;
    },
    logout: () => initialState,
  },
});

export const {
  loginStart,
  loginError,
  loginSuccess,
  signupStart,
  signupSuccess,
  signupError,
  logout
} = interviewerSlice.actions;

export default interviewerSlice.reducer;
