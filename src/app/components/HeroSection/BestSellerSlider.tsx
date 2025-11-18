"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useCallback } from "react";
import { bestSellers } from "../../MockData/bestsellers";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function BestSellerSlider() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scrollRight = useCallback(() => {
    sliderRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  }, []);

  const scrollLeft = useCallback(() => {
    sliderRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  }, []);

  return (
    <section className="mt-16">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Best Sellers
          </h2>

          <Link
            href="/products"
            className="text-indigo-600 font-semibold hover:underline cursor-pointer"
          >
            See All →
          </Link>
        </div>

        {/* Slider Container */}
        <div className="relative">

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow hover:bg-white"
          >
            <FiChevronLeft size={24} />
          </button>

          {/* Slider */}
          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar px-10"
          >
            {bestSellers.map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="
                  min-w-[180px] bg-white rounded-lg shadow
                  hover:shadow-lg transition block cursor-pointer p-4
                "
              >
                <Image
                  src={product.img}
                  alt={product.title}
                  width={150}
                  height={150}
                  className="rounded-md h-32 w-full object-cover"
                />

                <p className="mt-2 text-gray-800 font-semibold">
                  {product.title}
                </p>

                <p className="text-indigo-600 font-bold">₹{product.price}</p>

                <p className="text-sm text-yellow-500">⭐ {product.rating}</p>
              </Link>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 z-10 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow hover:bg-white"
          >
            <FiChevronRight size={24} />
          </button>

        </div>
      </div>
    </section>
  );
}
