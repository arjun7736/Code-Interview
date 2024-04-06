import { createSlice } from "@reduxjs/toolkit";

export const intervieweeSlice = createSlice({
    name: "interviewee",
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
export const {loginStart,loginError,loginSuccess}=intervieweeSlice.actions
export default  intervieweeSlice.reducer;