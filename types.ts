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
