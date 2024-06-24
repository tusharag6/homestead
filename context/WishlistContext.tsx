import { ReactNode, createContext, useReducer } from "react";

export interface WishlistItem {
  id: string;
  name: string;
  image_url: string;
  review_scores_rating: number;
  room_type: string;
  price: number;
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
        items: state.items.filter((item) => item.id !== action.payload.id),
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
