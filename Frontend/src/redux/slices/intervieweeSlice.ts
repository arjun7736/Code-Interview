import { IntervieweeData } from "@/interface/userDataTypeInterface";
import { intervieweeState } from "@/interface/userStateInterface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


 const initialState: intervieweeState = {
  loading: false,
  error: null,
  intervieweeData: null,
};

export const intervieweeSlice = createSlice({
  name: "interviewee",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.intervieweeData = null;
    },
    loginSuccess: (state, action: PayloadAction<IntervieweeData>) => {
      state.loading = false;
      state.error = null;
      state.intervieweeData = action.payload;
    },
    loginError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.intervieweeData = null;
    },
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
      state.intervieweeData = null;
    },
    signupSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.intervieweeData = null;
    },
    signupError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.intervieweeData = null;
    },
    logout: () => initialState,
  },
});

export const {
  loginStart,
  loginSuccess,
  loginError,
  signupStart,
  signupSuccess,
  signupError,
  logout
} = intervieweeSlice.actions;

export default intervieweeSlice.reducer;
