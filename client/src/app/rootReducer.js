import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { authApi } from "@/features/api/authApi";
import { tournamentApi } from "@/features/api/tournamentApi";

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [tournamentApi.reducerPath]: tournamentApi.reducer,
    auth: authReducer
});
export default rootReducer;