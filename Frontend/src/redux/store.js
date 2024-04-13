import { combineReducers, configureStore } from "@reduxjs/toolkit";
import interviewerReducer from "./slices/interviewerSlice"
import intervieweeReducer from "./slices/intervieweeSlice"
import adminReducer from "./slices/adminSlice"
import companyReducer from "./slices/companySlice"
import tempReducer from "./slices/tempSlice"

const rootReducer = combineReducers({ interviewer: interviewerReducer, interviewee: intervieweeReducer, admin: adminReducer, company: companyReducer ,temp:tempReducer})
const store = configureStore({
    reducer: rootReducer
})
export default store;