"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const sliderImages = [
  "/images/hero1.webp",
  "/images/hero2.webp",
  "/images/hero3.webp",
  "/images/hero4.webp",
  "/images/hero5.webp",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Move to next slide
  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % sliderImages.length);
  }, []);

  // Move to previous slide
  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  }, []);

  // Auto slide every 1.5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 1500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="pt-10 pb-10 bg-gray-100">
      <div className="container mx-auto px-4">

        {/* Banner Slider */}
        <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">

          {/* Smooth fade animation */}
          <Image
            key={current}
            src={sliderImages[current]}
            alt="Banner"
            width={1600}
            height={600}
            priority
            className="w-full h-full object-cover duration-500 transition-opacity"
          />

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 left-4 bg-white/80 hover:bg-white p-3 rounded-full shadow transition"
          >
            <FiChevronLeft size={26} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 right-4 bg-white/80 hover:bg-white p-3 rounded-full shadow transition"
          >
            <FiChevronRight size={26} />
          </button>
        </div>

        {/* Flash strip */}
        <div className="bg-indigo-600 text-white text-center py-2 mt-4 rounded-lg font-semibold shadow-md">
          ⚡ MEGA SALE: Up to 70% OFF on Fashion, Electronics & More!
        </div>

        {/* Category row */}
        <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
          {[
            { name: "Mobiles", img: "/images/mobiles.webp" },
            { name: "Fashion", img: "/images/fashion.webp" },
            { name: "Electronics", img: "/images/electronics.webp" },
            { name: "Beauty", img: "/images/beauty.webp" },
            { name: "Home", img: "/images/home.webp" },
            { name: "Grocery", img: "/images/grocery.webp" },
          ].map((cat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-3 cursor-pointer"
            >
              <Image
                src={cat.img}
                alt={cat.name}
                width={80}
                height={80}
                className="rounded-md mx-auto h-16 w-16 object-cover"
              />
              <p className="mt-2 text-gray-700 font-medium">{cat.name}</p>
            </div>
          ))}
        </div>

        {/* Main Heading */}
        <div className="mt-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            Shop Everything You Love — Delivered Fast 🚚
          </h1>

          <button className="mt-6 px-8 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition text-lg font-medium">
            Explore Now →
          </button>
        </div>
      </div>
    </section>
  );
}
