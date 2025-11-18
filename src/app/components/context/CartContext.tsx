"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import toast from "react-hot-toast";

type CartItem = {
  id: number;
  title: string;
  price: number;
  img: string;
  qty: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "qty">) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  /* ------------------ LOAD ------------------ */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart");
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, []);

  /* ------------------ SAVE ------------------ */
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  /* ------------------ FUNCTIONS ------------------ */

  const addToCart = useCallback((product: Omit<CartItem, "qty">) => {
    setCart((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) return prev;

      return [...prev, { ...product, qty: 1 }];
    });

    // toast OUTSIDE updater → runs ONCE
    if (!cart.some((i) => i.id === product.id)) {
      toast.success("Added to cart 🛒");
    }
  }, [cart]);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.error("Removed from cart");
  }, []);

  const increaseQty = useCallback((id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
    toast.success("Quantity increased");
  }, []);

  const decreaseQty = useCallback((id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: Math.max(1, item.qty - 1) }
            : item
        )
    );
    toast("Quantity decreased", { icon: "➖" });
  }, []);

  /* ------------------ VALUE ------------------ */
  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      increaseQty,
      decreaseQty,
    }),
    [cart, addToCart, removeFromCart, increaseQty, decreaseQty]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
