"use client";

import Image from "next/image";

export default function CollectionsSection() {
  const collections = [
    {
      title: "Fashion Picks",
      largeImg: "/images/FashionPicks2.webp",
      largeText: "Trending Styles",
      smallImgs: [
        "/images/FashionPicks.webp",
        "/images/Sunglasses.webp",
      ],
    },
    {
      title: "Electronics Deals",
      largeImg: "/images/electronics1.webp",
      largeText: "Hot Tech Deals",
      smallImgs: [
        "/images/electronics.webp",
        "/images/bluetooth.webp",
      ],
    },
    {
      title: "Home Essentials",
      largeImg: "/images/HomeEssentials.webp",
      largeText: "Must-Have Items",
      smallImgs: [
        "/images/HomeEssentials2.webp",
        "/images/home.webp",
      ],
    },
  ];

  return (
    <section className="mt-20">
      <div className="container mx-auto px-4">

        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          Curated Collections For You
        </h2>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-10">

          {collections.map((col, index) => (
            <div key={index} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">{col.title}</h3>

              {/* Large Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <Image
                  src={col.largeImg}
                  alt={col.title}
                  width={500}
                  height={300}
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 group-hover:opacity-90 transition"></div>
                <p className="absolute bottom-3 left-4 text-white text-lg font-semibold">
                  {col.largeText}
                </p>
              </div>

              {/* Small Images */}
              <div className="grid grid-cols-2 gap-6">
                {col.smallImgs.map((img, i) => (
                  <div
                    key={i}
                    className="relative rounded-2xl overflow-hidden shadow-md group cursor-pointer"
                  >
                    <Image
                      src={img}
                      alt={col.title}
                      width={300}
                      height={200}
                      className="w-full h-36 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-40 transition"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
