import { useContext } from "react";
import {
  WishlistContext,
  WishlistContextProps,
} from "@/context/WishlistContext";

export function useWishlist(): WishlistContextProps {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
