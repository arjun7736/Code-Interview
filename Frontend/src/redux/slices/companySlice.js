import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
    name: "company",
    initialState: {
        loading: false,
        error: null,
        userData: null,
        interviewers:null
    },
    reducers: {
        signupStart: (state, action) => {
            state.loading = true;
            state.error = null
        },
        signupSuccess: (state, action) => {
            state.loading = false
            state.error = null
        },
        signupError: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        loginStart: (state, action) => {
            state.loading = true
            state.error = null
            state.userData = null
        },
        loginSuccess: (state, action) => {
            state.loading = false
            state.error = null
            state.userData = action.payload
        },
        loginError: (state, action) => {
            state.loading = false
            state.error = action.payload
            state.userData = null
        },
        clearError: (state, action) => {
            state.error = null;
        },
        interviewersListStart:(state,action)=>{
            state.loading =true
            state.interviewers =null
        },
        interviewersListSuccess:(state,action)=>{
            state.loading =false
            state.interviewers =action.payload
        },
        interviewersListError:(state,action)=>{
            state.loading=false
            state.error =action.payload
        }
    }
})
export const { signupStart, signupError, signupSuccess,loginStart,loginError,loginSuccess,clearError,interviewersListStart,interviewersListSuccess,interviewersListError } = companySlice.actions
export default companySlice.reducer;