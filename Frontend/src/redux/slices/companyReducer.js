import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
    name: "company",
    initialState: {
        loading: false,
        error: null
    },
    reducers: {
        signupStart: (state, action) => {
            state.loading = true;
            state.error = null
        },
        signupSuccess: (state, action) => {
            state.loading = false
            state.error =null
        },
        signupError: (state, action) => {
            state.loading = false
            state.error =action.payload
        }

    }
})
export const {signupStart,signupError,signupSuccess}=companySlice.actions
export default  companySlice.reducer;