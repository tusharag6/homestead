import { configureStore } from "@reduxjs/toolkit";
import authReducer, { initializeAuthState } from "./authSlice";
import authApi from "./authApi";
import listingReducer from "./listingSlice";
import listingApi from "./listingApi";
import { apiSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listing: listingReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

store.dispatch(initializeAuthState());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
