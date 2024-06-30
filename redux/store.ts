import { configureStore } from "@reduxjs/toolkit";
import authReducer, { initializeAuthState } from "./authSlice";
import authApi from "./authApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

store.dispatch(initializeAuthState());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
