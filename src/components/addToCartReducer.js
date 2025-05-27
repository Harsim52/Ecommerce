export const cartState = { count: 0, isShowing: false, cartProducts: [] };

export function addToCartReducer(state, action) {
  switch (action.type) {
    case "addToCart":
      const isExisting = state.cartProducts.find(
        (p) => p.id === action.payload.id
      );
      if (isExisting) {
        return {
          ...state,
          cartProducts: state.cartProducts.map((p) =>
            p.id === action.payload.id ? { ...p, qty: p.qty + 1 } : p
          ),
        };
      } else {
        return {
          ...state,
          cartProducts: [...state.cartProducts, { ...action.payload, qty: 1 }],
          
        };
      }
     
    case "showCart":
      return {
        ...state,
        isShowing: !state.isShowing,
      };
      case "handleIncrement":
        return{
          ...state,
          cartProducts: state.cartProducts.map((p) =>
            p.id === action.payload.id ? { ...p, qty: p.qty + 1 } : p
          ),
        };
        case "handleDecrement":
           return{
          ...state,
          cartProducts: state.cartProducts.map((p) =>
            p.id === action.payload.id ? { ...p, qty: p.qty - 1 } : p
          ).filter(p=>p.qty>0),
        };
    default:
      return state;
  }
}
