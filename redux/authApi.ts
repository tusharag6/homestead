import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "./authSlice";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.10:5000/api/v1/user",
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
            await AsyncStorage.setItem("accessToken", data.data.accessToken);
            await AsyncStorage.setItem("refreshToken", data.data.refreshToken);
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
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

export default authApi;
