import { createSlice } from "@reduxjs/toolkit";

export const tempSlice = createSlice({
    name: "temp",
    initialState: {
        loading: false,
        error: null,
    },
    reducers: {
        otpVerificationStart: (state, action) => {
            state.loading = true
            state.error =null
        },
        otpVerificationError:(state,action)=>{
            state.loading =false
            state.error =action.payload
        },
        otpVerified:(state,action)=>{
            state.loading =false
            state.error =null
        }
    }
})
export const {otpVerificationError,otpVerificationStart,otpVerified}=tempSlice.actions
export default tempSlice.reducer