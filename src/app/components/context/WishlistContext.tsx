"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from "react";

type WishlistItem = {
  id: number;
  title: string;
  price: number;
  img: string;
};

type WishlistContextType = {
  wishlist: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isWishlisted: (id: number) => boolean;
  removeFromWishlist: (id: number) => void;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Load wishlist only once
  useEffect(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setWishlist(parsed);
      }
    } catch (err) {
      console.error("Wishlist load error:", err);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (err) {
      console.error("Wishlist save error:", err);
    }
  }, [wishlist]);

  // Toggle wishlist item
  const toggleWishlist = useCallback((item: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      return exists
        ? prev.filter((p) => p.id !== item.id)
        : [...prev, item];
    });
  }, []);

  // Remove item
  const removeFromWishlist = useCallback((id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Check if wishlisted
  const isWishlisted = useCallback(
    (id: number) => wishlist.some((item) => item.id === id),
    [wishlist]
  );

  // Memoize context data
  const value = useMemo(
    () => ({
      wishlist,
      toggleWishlist,
      isWishlisted,
      removeFromWishlist,
    }),
    [wishlist, toggleWishlist, isWishlisted, removeFromWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
