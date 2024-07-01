import { Listing } from "@/types";
import { apiSlice } from "./apiSlice";

interface FetchListingsResponse {
  data: {
    listings: Listing[];
    next: {
      page: number;
      limit: number;
    };
  };
  message: string;
  statusCode: number;
  success: boolean;
}

interface FetchListingsParams {
  page: number;
  limit: number;
}

const listingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchListings: builder.query<FetchListingsResponse, FetchListingsParams>({
      query: ({ page, limit }) => `/listings/all?page=${page}&limit=${limit}`,
    }),
  }),
});

export const { useFetchListingsQuery } = listingApi;

export default listingApi;
