import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
    name: "admin",
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
export const {loginStart,loginError,loginSuccess}=adminSlice.actions
export default  adminSlice.reducer;