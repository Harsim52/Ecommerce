import React, { useEffect, useReducer, useState } from "react";
import { initialState, productReducer } from "./productReducer";
import { addToCartReducer, cartState } from "./addToCartReducer";
import { wishlistState, wishlistReducer } from "./wishlistReducer";

const ProductsComp = () => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const { loading, products, filtered, categories, error } = state;
  const [addToCartState, cartDispatch] = useReducer(
    addToCartReducer,
    cartState
  );
  const { count, isShowing, cartProducts } = addToCartState;
  const [addToWishlistState, wishlistDispatch] = useReducer(
    wishlistReducer,
    wishlistState
  );

  const { wishlistProducts, wishlistShowing } = addToWishlistState;

  const [viewMode, setViewMode] = useState("all");

  let productsToRender = [];

  if (viewMode === "cart") {
    productsToRender = cartProducts;
  } else if (viewMode === "wishlist") {
    productsToRender = wishlistProducts;
  } else {
    productsToRender = filtered;
  }

  useEffect(() => {
    dispatch({ type: "Fetch_Start" });
    async function fetchData() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        dispatch({ type: "Fetch_Success", payload: data });
      } catch (err) {
        dispatch({ type: "Fetch_Error", payload: err.message });
      }
    }
    fetchData();
    console.log();
  }, []);

  const handleInput = (e) => {
    dispatch({ type: "Search", payload: e.target.value });
  };

  const handleSelect = (e) => {
    dispatch({ type: "Filter_by_Categroy", payload: e.target.value });
  };

  const allCategories =
    categories &&
    categories.map((ct) => (
      <option value={ct} key={ct}>
        {ct}
      </option>
    ));

  const handlePriceSelect = (e) => {
    dispatch({ type: "Sort_by_price", payload: e.target.value });
  };
  function handleCartClick(data) {
    cartDispatch({ type: "addToCart", payload: data });
  }
  function handleWishlist(data) {
    wishlistDispatch({ type: "addToWishlist", payload: data });
  }

  function handleInc(data) {
    cartDispatch({ type: "handleIncrement", payload: data });
  }
  function handleDec(data) {
    cartDispatch({ type: "handleDecrement", payload: data });
  }

  const filteredProducts =
    productsToRender.length === 0 ? (
    <p className="text-gray-500 text-xl col-span-full text-center mt-20">
        {viewMode === "cart"
          ? "Your cart is empty"
          : viewMode === "wishlist"
          ? "Your wishlist is empty"
          : "No products found"}
      </p>
    ) : (
      productsToRender.map((p) => {
        const cartItem = cartProducts.find((product) => product.id === p.id);
        return (
          
          <div key={p.id} className="mt-20 border-2 p-2  shadow-lg">
            <img src={p.image} alt="" className="w-24 h-24 onject cotain " />
            <h3 className=" text-left">{p.title}</h3>
            <p className=" text-left">{p.price}</p>
            <div className="flex flex-col ">
              {cartItem ? (
                <div>
                  <button onClick={() => handleInc(p)}>+</button>
                  <p>{cartItem.qty}</p>
                  <button onClick={() => handleDec(p)}>-</button>
                </div>
              ) : (
                viewMode !== "cart" && (
                  <button
                    className=" text-left"
                    onClick={() => handleCartClick(p)}
                  >
                    Add to cart
                  </button>
                )
              )}

              <button className=" text-left" onClick={() => handleWishlist(p)}>
                {viewMode !== "wishlist" &&
                wishlistProducts.some((product) => product.id === p.id)
                  ? "undo"
                  : "Add to Wishlist"}
              </button>
            </div>
          </div>
        );
      })
    );

  function handleShowCart() {
    setViewMode("cart");
  }

  function handleShowWishlist() {
    setViewMode("wishlist");
  }

  return (
    <>
     {viewMode === 'all' && <div className="bg-gray-100 rounded-2xl p-3 flex-1 justify-end fixed top-0 lg:w-4xl md:w-4xl sm:w-2xl">
        <input
          type="text"
          placeholder="search products"
          onChange={handleInput}
          className="w-3/5 pl-3 "
        />
        <select onChange={handleSelect} className="w-1/5 text-center ">
          <option value="All">All</option>
          {allCategories}
        </select>
        <select onChange={handlePriceSelect} className="w-1/5  ">
          <option value="asc" className="flex flex-wrap">
            Low to High
          </option>
          <option value="desc">High to Low</option>
        </select>
      </div>}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {filteredProducts}
      </div>
      <button onClick={handleShowCart} id="cart" className="bg-gray-100 rounded-2xl p-3 flex gap-2 ">
       <span> Cart</span>
       <span> {cartProducts && cartProducts.reduce((acc, val) => acc + val.qty, 0)}</span>
      </button>

      <button onClick={handleShowWishlist} id="wishlist" className="bg-gray-100 rounded-2xl p-3">
        Whishlist
      </button>
    </>
  );
};

export default ProductsComp;
