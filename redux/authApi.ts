import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearCredentials, setCredentials } from "./authSlice";
import { apiSlice } from "./apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (crendentials) => ({
        url: "/user/login",
        method: "POST",
        body: crendentials,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data.statusCode == 200) {
            await AsyncStorage.setItem("token", data.data.token);
            await AsyncStorage.setItem("user", JSON.stringify(data.data.user));
            dispatch(setCredentials(data.data));
          }
        } catch (error) {}
      },
    }),
    register: builder.mutation({
      query: (crendentials) => ({
        url: "/user/register",
        method: "POST",
        body: crendentials,
      }),
    }),
    logout: builder.mutation({
      query: (token: string) => ({
        url: "/user/logout",
        method: "POST",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data.statusCode == 200) {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");
            dispatch(clearCredentials());
          }
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;

export default authApi;
