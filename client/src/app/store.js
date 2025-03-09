import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './rootReducer'; 
import { authApi } from "@/features/api/authApi";
import { tournamentApi } from "@/features/api/tournamentApi";
import { purchaseApi } from "@/features/api/purchaseApi";

export const appStore = configureStore({
    reducer: rootReducer,
    middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, tournamentApi.middleware, purchaseApi.middleware)
});

const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();