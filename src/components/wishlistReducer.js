import { useReducer } from "react";

export const wishlistState = { wishlistProducts: [], wishlistShowing: false };

export function wishlistReducer(state, action) {
  switch (action.type) {
    case "addToWishlist":
      const alreadyExist = state.wishlistProducts.some(
        (p) => p.id === action.payload.id
      );

      return {
        ...state,

        wishlistProducts: alreadyExist
          ? state.wishlistProducts.filter((p) => p.id != action.payload.id)
          : [...state.wishlistProducts, action.payload],
      };
    case "showWishlist":
      return {
        ...state,
        wishlistShowing: !state.wishlistShowing,
      };
  }
}
