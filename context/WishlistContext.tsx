import { ReactNode, createContext, useReducer } from "react";

export interface WishlistItem {
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
  amenities: [string];
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

export interface WishlistState {
  items: WishlistItem[];
}

export type WishlistAction =
  | { type: "ADD_ITEM"; payload: WishlistItem }
  | { type: "REMOVE_ITEM"; payload: { id: string } };

export interface WishlistContextProps {
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
}

export const WishlistContext = createContext<WishlistContextProps | undefined>(
  undefined
);

export const initialState: WishlistState = { items: [] };

export function wishlistReducer(
  state: WishlistState,
  action: WishlistAction
): WishlistState {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload.id),
      };
    default:
      throw new Error(`Unhandled action type:`);
  }
}

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};
