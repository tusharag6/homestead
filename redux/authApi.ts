import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearCredentials, setCredentials } from "./authSlice";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.10:5000/api/v1/user",
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (crendentials) => ({
        url: "/login",
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
        url: "/register",
        method: "POST",
        body: crendentials,
      }),
    }),
    logout: builder.mutation({
      query: (token: string) => ({
        url: "/logout",
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
