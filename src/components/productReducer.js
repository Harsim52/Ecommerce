export const initialState = {
  loading: false,
  products: [],
  filtered: [],
  categories: [],
  error: "",
};

export function productReducer(state, action) {
  switch (action.type) {
    case "Fetch_Start":
      return { ...state, loading: true, error: null };
    case "Fetch_Success":
      return {
        ...state,
        loading: false,
        products: action.payload,
        filtered: action.payload,
        categories: [...new Set(action.payload.map((p) => p.category))],
      };
    case "Fetch_Error":
      return { ...state, error: action.payload };
    case "Search":
      return {
        ...state,
        filtered: state.products.filter((p) => {
          
          return p.title.toLowerCase().includes(action.payload.toLowerCase());
        }),
      };
    case "Filter_by_Categroy":
      return {
        ...state,
        filtered:
          action.payload === "All"
            ? state.products
            : state.products.filter((p) => p.category === action.payload),
      };
    case "Sort_by_price":
      return {
        ...state,
        filtered: [...state.filtered].sort((a, b) =>
          action.payload === "asc" ? a.price - b.price : b.price - a.price
        ),
      };
  }
}
