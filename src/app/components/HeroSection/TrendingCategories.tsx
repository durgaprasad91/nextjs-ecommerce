"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "../../MockData/categories";

export default function TrendingCategories() {
  return (
    <section className="mt-16">
      <div className="container mx-auto px-4">

        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Trending Categories
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              href="/products"
              key={cat.id}
              className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition block cursor-pointer"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <Image
                  src={cat.img}
                  alt={cat.name}
                  width={200}
                  height={200}
                  className="w-full h-32 object-cover"
                />

                <div className="p-3 text-center">
                  <p className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                    {cat.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
