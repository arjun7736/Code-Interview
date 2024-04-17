import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
    name: "admin",
    initialState: {
        loading: false,
        adminData: null,
        error: null,
        companyData: null,
        intervieweeData: null,
        interviewerData: null,
    },
    reducers: {
        loginStart: (state, action) => {
            state.loading = true;
            state.error = null
            state.adminData = null
        },
        loginSuccess: (state, action) => {
            state.loading = false
            state.error = null
            state.adminData = action.payload
        },
        loginError: (state, action) => {
            state.loading = false
            state.error = action.payload
            state.adminData = null
        },
        setCompanydata: (state, action) => {
            state.loading = false
            state.companyData = action.payload
            state.error = null
        },
        setIntervieweeData: (state, action) => {
            state.loading = false
            state.intervieweeData = action.payload
            state.error = null
        },
        setInterviewerData: (state, action) => {
            state.loading = false
            state.interviewerData = action.payload
            state.error = null
        },
    }
})
export const { loginStart, loginError, loginSuccess, setCompanydata, setIntervieweeData, setInterviewerData } = adminSlice.actions
export default adminSlice.reducer;