"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useMemo, useCallback } from "react";
import { useWishlist } from "../context/WishlistContext";
import { allProducts } from "../../MockData/allProducts";
import toast from "react-hot-toast";

function ProductsGrid({ filters, sortBy, overrideProducts }: any) {
  const { toggleWishlist, isWishlisted } = useWishlist();

  // -------------------------
  // PRODUCT FILTER + SORT (MEMOIZED)
  // -------------------------
  const filteredProducts = useMemo(() => {
    let list = overrideProducts || allProducts;

    if (filters) {
      const { categories, brands, rating, minPrice, maxPrice } = filters;

      if (categories?.length)
        list = list.filter((p) => categories.includes(p.category));

      if (brands?.length)
        list = list.filter((p) => brands.includes(p.brand));

      if (rating)
        list = list.filter((p) => p.rating >= rating);

      if (minPrice)
        list = list.filter((p) => p.price >= minPrice);

      if (maxPrice)
        list = list.filter((p) => p.price <= maxPrice);
    }

    if (!sortBy) return list;

    const sorted = [...list];

    const sortMap: any = {
      "low-high": (a: any, b: any) => a.price - b.price,
      "high-low": (a: any, b: any) => b.price - a.price,
      rating: (a: any, b: any) => b.rating - a.rating,
      newest: (a: any, b: any) => b.id - a.id,
    };

    sorted.sort(sortMap[sortBy] || (() => 0));

    return sorted;
  }, [filters, sortBy, overrideProducts]);

  // -------------------------
  // WISHLIST HANDLER (MEMOIZED)
  // -------------------------
  const handleWishlistClick = useCallback(
    (product: any, alreadyInWishlist: boolean) => {
      toggleWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        img: product.images[0],
      });

      toast.success(
        alreadyInWishlist ? "Removed from wishlist" : "Added to wishlist ❤️"
      );
    },
    [toggleWishlist]
  );

  // -------------------------
  // EMPTY STATE
  // -------------------------
  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-5">
      {filteredProducts.map((product) => {
        const alreadyWishlisted = isWishlisted(product.id);

        return (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow p-3 hover:shadow-lg transition"
          >
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.images[0]}
                alt={product.title}
                width={300}
                height={300}
                className="rounded-lg w-full h-32 sm:h-40 object-cover"
              />

              <h3 className="mt-2 font-semibold text-gray-900 text-sm sm:text-base">
                {product.title}
              </h3>

              <p className="text-indigo-600 font-bold">₹{product.price}</p>
              <p className="text-yellow-500 text-sm sm:text-base">
                ⭐ {product.rating}
              </p>
            </Link>

            <button
              onClick={() => handleWishlistClick(product, alreadyWishlisted)}
              className="mt-2 text-xl"
            >
              {alreadyWishlisted ? "❤️" : "🤍"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default memo(ProductsGrid);
