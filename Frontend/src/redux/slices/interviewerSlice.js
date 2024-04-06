import { createSlice } from "@reduxjs/toolkit";

const interviewerSlice = createSlice({
    name: "interviewer",
    initialState: {
        loading: false,
        error: false
    },
    reducers: {
        loginStart: (state, action) => {
            state.loading = true
            state.error=false
        },
        loginFailed:(state,action)=>{
            state.loading=false
            
        },
        loginSuccess:(state,action)=>{
            state.loading =false
            state.error =false
        }
    }
})
export const {loginStart,loginSuccess,loginFailed}=interviewerSlice.actions;
export  default  interviewerSlice.reducer;