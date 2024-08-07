import { FetchBookingByIdResponse, FetchBookingResponse } from "@/types";
import { apiSlice } from "./apiSlice";
import { clearBookingDetails } from "./bookingSlice";

const bookingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    confirmReservation: builder.mutation({
      query: (payload) => ({
        url: "/bookings/reserve",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Reservations"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data.statusCode == 201) {
            dispatch(clearBookingDetails());
          }
        } catch (error) {}
      },
    }),
    fetchBooking: builder.query<FetchBookingResponse, void>({
      query: () => `/bookings/user`,
      providesTags: ["Reservations"],
    }),
    fetchBookingById: builder.query<FetchBookingByIdResponse, string>({
      query: (id) => `/bookings/${id}`,
    }),
  }),
});

export const {
  useConfirmReservationMutation,
  useFetchBookingQuery,
  useFetchBookingByIdQuery,
} = bookingApi;

export default bookingApi;
