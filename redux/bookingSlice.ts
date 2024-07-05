import { BookingState, Listing } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

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
    setStartDate: (state, action) => {
      state.startDate = action.payload.startDate;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload.endDate;
    },
  },
});

export const {
  clearBookingDetails,
  setBookingDetails,
  setBookingTotal,
  setEndDate,
  setStartDate,
} = bookingSlice.actions;
export default bookingSlice.reducer;
