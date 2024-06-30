import { loadUserFromAsyncStorage } from "@/utilts";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearCredentials: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const initializeAuthState =
  () =>
  async (
    dispatch: (arg0: { payload: any; type: "auth/setCredentials" }) => void
  ) => {
    const { refreshToken, accessToken, user } =
      await loadUserFromAsyncStorage();
    if (refreshToken && accessToken && user) {
      dispatch(setCredentials({ user, accessToken, refreshToken }));
    }
  };

export const { clearCredentials, setCredentials } = authSlice.actions;

export default authSlice.reducer;
