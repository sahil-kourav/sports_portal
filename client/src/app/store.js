import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './rootReducer'; 
import { authApi } from "@/features/api/authApi";
import { enrollmentApi } from "@/features/api/enrollmentApi";
import { tournamentApi } from "@/features/api/tournamentApi";

export const appStore = configureStore({
    reducer: rootReducer,
    middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, tournamentApi.middleware, enrollmentApi.middleware),
});

const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();

