"use client";

import Image from "next/image";
import Link from "next/link";
import { featuredProducts } from "../../MockData/featured";
import { memo } from "react";

function FeaturedProducts() {
  return (
    <section className="mt-16">
      <div className="container mx-auto px-4">

        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Featured Products
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition block cursor-pointer"
            >
              <Image
                src={product.img}
                alt={product.title}
                width={200}
                height={200}
                className="rounded-md h-40 w-full object-cover"
                loading="lazy"
              />

              <p className="mt-3 font-semibold text-gray-800">
                {product.title}
              </p>

              <div className="flex items-center gap-1 text-yellow-500 text-sm">
                ⭐ {product.rating}
              </div>

              <div className="flex items-center gap-2 mt-1">
                <p className="text-indigo-600 font-bold text-lg">
                  ₹{product.price}
                </p>
                <p className="text-gray-500 line-through text-sm">
                  ₹{product.oldPrice}
                </p>
              </div>

              <button
                className="
                  mt-4 w-full py-2 bg-indigo-600 text-white 
                  rounded-lg shadow hover:bg-indigo-700 transition
                "
              >
                Add to Cart
              </button>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

export default memo(FeaturedProducts);
