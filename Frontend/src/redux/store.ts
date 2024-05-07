import { Reducer, combineReducers, configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { PersistPartial } from "redux-persist/es/persistReducer";
import intervieweeReducer from "./slices/intervieweeSlice";
import interviewerReducer  from "./slices/interviewerSlice";
import companyReducer from "./slices/companySlice"
import tempReducer from "./slices/tempSlice"
import { AdminState, companyState, intervieweeState, interviewerState,tempState } from "@/interface/userStateInterface";

export interface RootState {
  admin: AdminState;
  company:companyState
  interviewee: intervieweeState;
  interviewer: interviewerState;
  temp:tempState
}

const rootReducer: Reducer<RootState> = combineReducers({
  admin: adminReducer,
  company:companyReducer,
  interviewee: intervieweeReducer,
  interviewer: interviewerReducer,
  temp:tempReducer
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer: Reducer<RootState & PersistPartial> = persistReducer(
  persistConfig,
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
