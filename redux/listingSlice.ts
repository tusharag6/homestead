import { Listing } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ListingState {
  listings: Listing[];
}

const initialState: ListingState = {
  listings: [],
};

export const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    setListing(state, action: PayloadAction<Listing[]>) {
      state.listings = action.payload;
    },
    addListings(state, action: PayloadAction<Listing[]>) {
      state.listings = [...state.listings, ...action.payload];
    },
  },
});

export const { setListing, addListings } = listingSlice.actions;
export default listingSlice.reducer;
