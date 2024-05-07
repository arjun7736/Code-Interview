import { TempData } from "@/interface/userDataTypeInterface";
import { tempState } from "@/interface/userStateInterface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState:tempState={
    loading: false,
    error:null,
    userRole:null
}

export const tempSlice=createSlice ({
    name:"temp",
    initialState,
    reducers:{
        setUserRole:(state,action:PayloadAction<TempData>)=>{
            state.userRole=action.payload
        },
        otpVerificationStart: (state) => {
            state.loading = true
            state.error =null
        },
        otpVerificationError:(state,action:PayloadAction<string>)=>{
            state.loading =false
            state.error =action.payload
            state.userRole=null
        },
        otpVerified:(state)=>{
            state.loading =false
            state.error =null
            state.userRole=null
        }
    }
})

export const {otpVerificationError,otpVerificationStart,otpVerified,setUserRole}=tempSlice.actions
export default tempSlice.reducer