import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
    name: "company",
    initialState: {
        loading: false,
        error: null,
        userData: null
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
        }

    }
})
export const { signupStart, signupError, signupSuccess,loginStart,loginError,loginSuccess,clearError } = companySlice.actions
export default companySlice.reducer;