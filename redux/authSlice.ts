import { loadUserFromAsyncStorage } from "@/utilts";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearCredentials: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const initializeAuthState =
  () =>
  async (
    dispatch: (arg0: { payload: any; type: "auth/setCredentials" }) => void
  ) => {
    const { token, user } = await loadUserFromAsyncStorage();
    if (token && user) {
      dispatch(setCredentials({ user, token }));
    }
  };

export const { clearCredentials, setCredentials } = authSlice.actions;

export default authSlice.reducer;
