import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product, CartItem } from "../types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity: number;
        size?: string;
        customName?: string;
      }>
    ) => {
      const { product, quantity, size, customName } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === product.id && item.selectedSize === size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          ...product,
          quantity,
          selectedSize: size,
          customName,
        });
      }
    },
    removeItem: (
      state,
      action: PayloadAction<{ id: string; size?: string }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.selectedSize === action.payload.size
          )
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; delta: number; size?: string }>
    ) => {
      const { id, delta, size } = action.payload;
      const item = state.items.find(
        (i) => i.id === id && i.selectedSize === size
      );
      if (item) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) {
          state.items = state.items.filter(
            (i) => !(i.id === id && i.selectedSize === size)
          );
        } else {
          item.quantity = newQty;
        }
      }
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, setCartOpen, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
