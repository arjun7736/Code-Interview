import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
    name: "company",
    initialState: {
        loading: false,
        error: false
    },
    reducers: {
        loginStart: (state, action) => {
            state.loading = true;
            state.error = false
        },
        loginSuccess: (state, action) => {
            state.loading = false
        },
        loginError: (state, action) => {
            state.loading = false
            state.error =false
        }

    }
})
export const {loginStart,loginError,loginSuccess}=companySlice.actions
export default  companySlice.reducer;