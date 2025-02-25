import { createSlice } from "@reduxjs/toolkit";

// Retrieve user from localStorage if available
const storedUser = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
    user: storedUser,
    isAuthenticated: !!storedUser, // If user exists, set authenticated
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            // Store user in localStorage
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        },
        userLoggedOut: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            // Remove user from localStorage
            localStorage.removeItem("user");
        },
    },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
