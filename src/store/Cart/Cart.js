import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || {},
};

const Cartslice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id] += 1;
      } else {
        state.items[id] = 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    // 🧨 remove one item completely
    removeFromCart(state, action) {
      const id = action.payload;
      if (state.items[id]) {
        delete state.items[id];
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },

    // 🧹 clear all cart (used after purchase complete)
    clearCart(state) {
      state.items = {};
      localStorage.removeItem("cartItems");
    },
  },
});

const getcarttotalquantity = createSelector(
  (state) => state.cart.items,
  (items) => Object.values(items).reduce((total, qty) => total + qty, 0)
);

export const { addToCart, removeFromCart, clearCart } = Cartslice.actions;
export { getcarttotalquantity };
export default Cartslice.reducer;
