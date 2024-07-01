import { FetchListingsByIdResponse, FetchListingsResponse } from "@/types";
import { apiSlice } from "./apiSlice";

interface FetchListingsParams {
  page: number;
  limit: number;
}

const listingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchListings: builder.query<FetchListingsResponse, FetchListingsParams>({
      query: ({ page, limit }) => `/listings/all?page=${page}&limit=${limit}`,
    }),
    fetchListingById: builder.query<FetchListingsByIdResponse, string>({
      query: (id) => `/listings/${id}`,
    }),
  }),
});

export const { useFetchListingsQuery, useFetchListingByIdQuery } = listingApi;

export default listingApi;
