import { createSlice } from "@reduxjs/toolkit";

const interviewerSlice = createSlice({
    name: "interviewer",
    initialState: {
        loading: false,
        error: null,
        interviewerData: null
    },
    reducers: {
        loginStart: (state, action) => {
            state.loading = true
            state.error = false,
                state.interviewerData = null;
        },
        loginError: (state, action) => {
            state.loading = false
            state.error = action.payload
            state.interviewerData = null
        },
        loginSuccess: (state, action) => {
            state.loading = false
            state.error = null
            state.interviewerData = action.payload
        }
    }
})
export const { loginStart, loginSuccess, loginError } = interviewerSlice.actions;
export default interviewerSlice.reducer;