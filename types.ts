export interface Listing {
  _id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  house_rules: string;
  listing_image_url: string;
  amenities: string[];
  price: number;
  review_scores_rating: number;
  number_of_reviews: number;
  room_type: string;
  property_type: string;
  accommodates: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface BookingState {
  listing: Listing | null;
  numberOfGuests: number;
  numberOfDays: number;
  startDate: Date | null;
  endDate: Date | null;
  price: number | null;
}

export interface ListingCardProps {
  item: {
    _id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    house_rules: string;
    listing_image_url: string;
    amenities: string[];
    price: number;
    review_scores_rating: number;
    number_of_reviews: number;
    room_type: string;
    property_type: string;
    accommodates: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
  };
  isGridMode: boolean;
}

export interface FetchListingsResponse {
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

export interface FetchListingsByIdResponse {
  data: Listing;
  message: string;
  statusCode: number;
  success: boolean;
}

export interface Booking {
  _id: string;
  numberOfGuests: number;
  numberOfDays: number;
  startDate: string;
  endDate: string;
  price: number | null;
  listing: Listing;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface FetchBookingResponse {
  statusCode: number;
  data: Booking[];
  message: string;
  success: boolean;
}
