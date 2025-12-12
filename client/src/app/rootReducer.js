import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { authApi } from "@/features/api/authApi";
import { tournamentApi } from "@/features/api/tournamentApi";
import { enrollmentApi } from "@/features/api/enrollmentApi";


const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [tournamentApi.reducerPath]: tournamentApi.reducer,
    [enrollmentApi.reducerPath]: enrollmentApi.reducer,
    auth: authReducer,
});
export default rootReducer;