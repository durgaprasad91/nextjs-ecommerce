"use client";

import Image from "next/image";
import { brands } from "../../MockData/brands";

export default function BrandsSection() {
  return (
    <section className="mt-20 bg-black py-14"> {/* ⬅️ added black background */}
      <div className="container mx-auto px-4">

        {/* Header */}
        <h2 className="text-3xl font-bold text-white mb-6">
          Brands You Love
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="
                bg-white rounded-xl shadow-sm p-6 
                flex items-center justify-center
                hover:shadow-lg hover:-translate-y-1
                transition cursor-pointer
              "
            >
              <Image
                src={brand.img}
                alt={brand.name}
                width={120}
                height={120}
                className="object-contain h-16 w-28 opacity-90 transition"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
