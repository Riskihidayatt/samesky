"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState, type ReactNode } from "react";
import { cartReducer, cartTotals, type CartAction, type CartItem, type CartState } from "./cart.reducer";

const STORAGE_KEY = "samesky-cart-v1";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  dispatch: (action: CartAction) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] } satisfies CartState);
  const [isOpen, setIsOpen] = useState(false);
  const hydrated = useRef(false);

  // Restore the cart once on the client. Storage can be unavailable (private mode), so stay silent on failure.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) dispatch({ type: "hydrate", items: parsed });
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Persist on change, skipping the very first run so the empty initial state never overwrites saved data.
  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* ignore */
    }
  }, [state.items]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "add", item });
    setIsOpen(true);
  }, []);

  const value = useMemo(() => {
    const { count, subtotal } = cartTotals(state);
    return { items: state.items, count, subtotal, isOpen, open, close, addItem, dispatch };
  }, [state, isOpen, open, close, addItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
