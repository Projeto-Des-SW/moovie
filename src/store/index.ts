import {configureStore} from "@reduxjs/toolkit";
import sessionReducer from "./session";
import loadingReducer from "./loading";

const store = configureStore({
    reducer: {
        session: sessionReducer,
        loading: loadingReducer,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
