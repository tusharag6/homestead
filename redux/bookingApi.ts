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
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.statusCode == 200) {
            dispatch(clearBookingDetails());
          }
        } catch (error) {}
      },
    }),
  }),
});

export const { useConfirmReservationMutation } = bookingApi;

export default bookingApi;
