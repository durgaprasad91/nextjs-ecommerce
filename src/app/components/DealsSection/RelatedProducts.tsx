"use client";

import React, { useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { allProducts } from "../../MockData/allProducts";
import { useWishlist } from "../context/WishlistContext";

function RelatedProducts({ currentId, category }: any) {
  const { toggleWishlist, isWishlisted } = useWishlist();

  // Memoize related product calculation
  const related = useMemo(() => {
    let items = allProducts
      .filter((p) => p.category === category && p.id !== currentId)
      .slice(0, 4);

    if (items.length < 4) {
      const extra = allProducts
        .filter((p) => p.id !== currentId)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4 - items.length);

      items = [...items, ...extra];
    }

    return items;
  }, [category, currentId]);

  // Wishlist handler memoized
  const handleWishlist = useCallback(
    (product: any) => {
      toggleWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        img: product.images[0],
      });
    },
    [toggleWishlist]
  );

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Related Products
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {related.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.images[0]}
                alt={product.title}
                width={200}
                height={200}
                className="rounded-lg w-full h-40 object-cover"
              />

              <h3 className="mt-2 font-semibold text-gray-800">
                {product.title}
              </h3>

              <p className="text-indigo-600 font-bold">₹{product.price}</p>
              <p className="text-sm text-yellow-500">⭐ {product.rating}</p>
            </Link>

            {/* Wishlist Button */}
            <button
              onClick={() => handleWishlist(product)}
              className="mt-2 text-xl"
            >
              {isWishlisted(product.id) ? "❤️" : "🤍"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(RelatedProducts);
