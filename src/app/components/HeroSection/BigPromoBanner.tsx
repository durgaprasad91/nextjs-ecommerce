import Image from "next/image";

export default function BigPromoBanner() {
  return (
    <section className="mt-20">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer">

          {/* Banner Image */}
          <Image
            src="/images/hero3.webp"
            alt="Big Promo Banner"
            width={1600}
            height={500}
            loading="lazy"
            className="w-full h-64 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
              Mega Sale Is Live Now!
            </h2>

            <p className="mt-3 text-lg md:text-xl font-medium drop-shadow-md">
              Up to 80% Off on Top Brands
            </p>

            <button className="mt-6 px-9 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition">
              Shop Now →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
