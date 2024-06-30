import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, clearCredentials } from "./authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://192.168.1.10:5000/api/v1/",
  prepareHeaders: async (headers) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    console.log("sending refresh token");
    // try to get a new token
    const refreshResult = await baseQuery("/user/refresh", api, extraOptions);
    if (refreshResult?.data) {
      const user = (await AsyncStorage.getItem("user")) || "";
      // store the new token
      const payload = {
        token: refreshResult.data,
        user: JSON.parse(user),
      };

      api.dispatch(setCredentials(payload));
      await AsyncStorage.setItem("token", refreshResult?.data as string);
      // retry the initial query
      try {
        result = await baseQuery(args, api, extraOptions);
      } catch (error) {}
    } else {
      api.dispatch(clearCredentials());
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      router.replace("(routes)/login");
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
