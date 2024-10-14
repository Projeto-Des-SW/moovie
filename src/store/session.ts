import {createSlice} from "@reduxjs/toolkit";

const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        accountId: null,
        sessionId: null,
        isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
        username: null,
        name: null,
        avatar_path: localStorage.getItem("avatar_path"),
    },
    reducers: {
        login: (state, action) => {
            state.accountId = action.payload.account_id;
            state.sessionId = action.payload.session_id;
            state.isLoggedIn = true;
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("avatar_path", action.payload.avatar_path);
        },
        logout: (state) => {
            state.accountId = null;
            state.sessionId = null;
            state.isLoggedIn = false;
            state.avatar_path = null;
            state.name = null;
            state.username = null;
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("avatar_path");
        },
        setAccountDetails: (state, action) => {
            state.username = action.payload.username;
            state.name = action.payload.name;
            state.avatar_path = action.payload.avatar_path;
            localStorage.setItem("avatar_path", action.payload.avatar_path);
        }
    }
});

export const sessionActions = sessionSlice.actions;

export default sessionSlice.reducer;

export interface SessionState {
    session: {
        accountId: string;
        sessionId: string;
        isLoggedIn: boolean;
        avatar_path: string;
        name: string;
        username: string;
    };
}
