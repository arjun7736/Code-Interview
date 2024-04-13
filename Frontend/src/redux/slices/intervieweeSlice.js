import { createSlice } from "@reduxjs/toolkit";

export const intervieweeSlice = createSlice({
    name: "interviewee",
    initialState: {
        loading: false,
        error: null,
        intervieweeData: null
    },
    reducers: {
        loginStart: (state, action) => {
            state.loading = true;
            state.error = false
        },
        loginSuccess: (state, action) => {
            state.loading = false
            state.intervieweeData =null
            state.error = null
        },
        loginError: (state, action) => {
            state.intervieweeData=null
            state.loading = false
            state.error = action.payload
        },
        signupStart: (state, action) => {
            state.intervieweeData =null
            state.loading = true
            state.error = null
        },
        signupError:(state,action)=>{
            state.loading =false
            state.error=action.payload
            state.intervieweeData= null
        },
        signupSuccess:(state,action)=>{
            state.intervieweeData=action.payload
            state.loading =false
            state.error=null
        }

    }
})
export const { loginStart, loginError, loginSuccess,signupStart,signupSuccess,signupError } = intervieweeSlice.actions
export default intervieweeSlice.reducer;