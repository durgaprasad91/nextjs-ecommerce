"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useMemo } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { deals } from "../../MockData/deals";

export default function DealsOfTheDay() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [timeLeft, setTimeLeft] = useState(7200);

  // Countdown timer (optimized)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Memoize time calculation
  const { hours, minutes, seconds } = useMemo(() => {
    return {
      hours: Math.floor(timeLeft / 3600),
      minutes: Math.floor((timeLeft % 3600) / 60),
      seconds: timeLeft % 60,
    };
  }, [timeLeft]);

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  return (
    <section className="mt-12">
      <div className="container mx-auto px-4">

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Deals of the Day
          </h2>
          <div className="text-red-600 font-semibold">
            ⏳ {hours}h : {minutes}m : {seconds}s left
          </div>
        </div>

        <div className="relative mt-6">

          {/* LEFT BUTTON */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
          >
            <FiChevronLeft size={24} />
          </button>

          {/* SLIDER */}
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-10"
          >
            {deals.map((item) => (
              <Link
                href={`/products/${item.id}`}
                key={item.id}
                className="min-w-[180px] bg-white p-4 rounded-lg shadow hover:shadow-md transition block cursor-pointer"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={150}
                  height={150}
                  className="rounded-lg h-32 w-full object-cover"
                />

                <p className="mt-2 font-semibold text-gray-800">
                  {item.title}
                </p>

                <div className="text-lg font-bold text-green-600">
                  ₹{item.price}
                </div>

                <div className="text-sm text-gray-500 line-through">
                  ₹{item.oldPrice}
                </div>
              </Link>
            ))}
          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={scrollRight}
            className="absolute right-0 z-10 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
          >
            <FiChevronRight size={24} />
          </button>
        </div>

      </div>
    </section>
  );
}
