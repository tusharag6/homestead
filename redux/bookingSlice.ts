import { Listing } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface BookingState {
  listing: Listing | null;
  numberOfGuests: number;
  numberOfDays: number;
  startDate: Date | null;
  endDate: Date | null;
  price: number | null;
}

const initialState: BookingState = {
  listing: null,
  numberOfGuests: 1,
  numberOfDays: 1,
  startDate: null,
  endDate: null,
  price: null,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingDetails: (state, action) => {
      state.listing = action.payload.listing;
      state.numberOfGuests = action.payload.numberOfGuests;
      state.numberOfDays = action.payload.numberOfDays;
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
    clearBookingDetails: (state) => {
      state.listing = null;
      state.numberOfGuests = 1;
      state.numberOfDays = 1;
      state.startDate = null;
      state.endDate = null;
    },
    setBookingTotal: (state, action) => {
      state.price = action.payload.price;
    },
  },
});

export const { clearBookingDetails, setBookingDetails, setBookingTotal } =
  bookingSlice.actions;
export default bookingSlice.reducer;
