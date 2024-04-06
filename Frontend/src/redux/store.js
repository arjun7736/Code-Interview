import { combineReducers, configureStore } from "@reduxjs/toolkit";
import interviewerReducer from "./slices/interviewerSlice"
import intervieweeReducer from "./slices/intervieweeSlice"
import adminReducer from "./slices/adminReducer"
import companyReducer from "./slices/companyReducer"

const rootReducer = combineReducers({ interviewer: interviewerReducer, interviewee: intervieweeReducer, admin: adminReducer, company: companyReducer })
const store = configureStore({
    reducer: rootReducer
})
export default store;