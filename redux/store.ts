import { configureStore } from "@reduxjs/toolkit";
import authReducer, { initializeAuthState } from "./authSlice";
import bookingReducer from "./bookingSlice";
import { apiSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["payload.startDate", "payload.endDate"],
      },
    }).concat(apiSlice.middleware),
});

store.dispatch(initializeAuthState());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
