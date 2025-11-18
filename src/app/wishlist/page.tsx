"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "../components/context/WishlistContext";

/* -------------------- TYPES -------------------- */
type WishlistItemType = {
  id: number;
  title: string;
  price: number;
  img: string;
};

/* -------------------- SKELETON -------------------- */
const WishlistSkeleton = React.memo(function WishlistSkeleton() {
  const skeletonItems = useMemo(() => [...Array(6)], []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {skeletonItems.map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <div className="w-full h-48 rounded-lg skeleton" />
          <div className="mt-3 w-3/4 skeleton skeleton-title" style={{ height: 18 }} />
          <div className="mt-2 w-1/3 skeleton skeleton-text" />
        </div>
      ))}
    </div>
  );
});

/* -------------------- WISHLIST ITEM -------------------- */
const WishlistItem = React.memo(function WishlistItem({
  item,
  onRemove,
}: {
  item: WishlistItemType;
  onRemove: (id: number) => void;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition p-4">
      <div className="w-full h-48 overflow-hidden rounded-lg">
        <Image
          src={item.img}
          alt={item.title}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="mt-3 font-semibold text-gray-900 dark:text-gray-200 text-lg">
        {item.title}
      </h2>

      <p className="text-indigo-600 dark:text-indigo-400 font-bold text-md">
        ₹{item.price}
      </p>

      <button
        onClick={() => onRemove(item.id)}
        className="mt-1 text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
      >
        Remove ❤️
      </button>

      <Link
        href={`/products/${item.id}`}
        className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline block"
      >
        View Product →
      </Link>
    </div>
  );
});

/* -------------------- MAIN PAGE -------------------- */
export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [loading, setLoading] = useState(true);

  const isEmpty = wishlist.length === 0;

  // typed callback
  const handleRemove = useCallback(
    (id: number) => {
      removeFromWishlist(id);
    },
    [removeFromWishlist]
  );

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="pt-28 pb-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Your Wishlist ❤️
        </h1>

        {/* LOADING */}
        {loading && <WishlistSkeleton />}

        {/* EMPTY */}
        {!loading && isEmpty && (
          <div className="text-center py-20 text-gray-600 dark:text-gray-300 text-lg">
            Your wishlist is empty.
            <br />
            <Link
              href="/products"
              className="mt-4 inline-block text-indigo-600 dark:text-indigo-400 font-semibold underline"
            >
              Browse Products →
            </Link>
          </div>
        )}

        {/* FILLED */}
        {!loading && !isEmpty && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlist.map((item: WishlistItemType) => (
              <WishlistItem key={item.id} item={item} onRemove={handleRemove} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
