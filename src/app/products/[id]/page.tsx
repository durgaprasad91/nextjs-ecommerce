"use client";

import Image from "next/image";
import { useState, useMemo, useCallback } from "react";
import { useRouter, notFound } from "next/navigation";

import { allProducts } from "../../MockData/allProducts";
import { useCart } from "../../components/context/CartContext";

import RelatedProducts from "../../components/DealsSection/RelatedProducts";

export default function ProductDetails({ params }: any) {
  const router = useRouter();
  const productId = Number(params.id);

  const { cart, addToCart, removeFromCart } = useCart();

  // Find product (memoized)
  const product = useMemo(
    () => allProducts.find((p) => p.id === productId),
    [productId]
  );

  if (!product) return notFound();

  // Cart check optimized
  const inCart = useMemo(
    () => cart.some((item) => item.id === productId),
    [cart, productId]
  );

  const [selectedImg, setSelectedImg] = useState(0);

  // Memoized discount
  const discountPercent = useMemo(() => {
    return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  }, [product.price, product.oldPrice]);

  // Handlers memoized
  const handleAdd = useCallback(() => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      img: product.images[0],
    });
  }, [addToCart, product]);

  const handleRemove = useCallback(() => {
    removeFromCart(product.id);
  }, [removeFromCart, product.id]);

  const handleImageSelect = useCallback((index: number) => {
    setSelectedImg(index);
  }, []);

  return (
    <section className="pt-10 pb-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* BACK BUTTON */}
        <button
          onClick={router.back}
          className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* LEFT — IMAGES */}
          <div>
            <div className="bg-white shadow rounded-xl p-3">
              <Image
                src={product.images[selectedImg]}
                alt={product.title}
                width={500}
                height={500}
                className="w-full h-[320px] object-cover rounded-xl"
                priority
              />
            </div>

            {/* THUMBNAILS (memoized render) */}
            <div className="flex gap-3 mt-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => handleImageSelect(index)}
                  className={`border-2 rounded-lg ${
                    selectedImg === index ? "border-indigo-600" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={img}
                    alt="thumb"
                    width={70}
                    height={70}
                    className="h-[70px] w-[70px] object-cover rounded-lg"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — DETAILS */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

            <p className="text-yellow-500 font-medium text-lg">
              ⭐ {product.rating} / 5
            </p>

            <div className="flex items-center gap-4">
              <p className="text-3xl font-bold text-indigo-600">₹{product.price}</p>
              <p className="text-gray-500 line-through text-lg">₹{product.oldPrice}</p>
              <p className="text-green-600 font-semibold">{discountPercent}% off</p>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* BUTTONS */}
            <div className="flex gap-4 pt-3">
              {!inCart ? (
                <button
                  onClick={handleAdd}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
                >
                  Add to Cart
                </button>
              ) : (
                <button
                  onClick={handleRemove}
                  className="px-8 py-3 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
                >
                  Remove from Cart
                </button>
              )}

              <button className="px-8 py-3 bg-orange-500 text-white rounded-xl shadow hover:bg-orange-600 transition">
                Buy Now
              </button>
            </div>

            <div className="bg-white shadow-md p-6 rounded-xl mt-6">
              <h2 className="text-xl font-bold mb-4">Product Details</h2>
              <p><strong>Brand:</strong> {product.brand}</p>
              <p className="mt-1"><strong>Category:</strong> {product.category}</p>
              <p className="mt-1"><strong>Rating:</strong> {product.rating}</p>
            </div>
          </div>
        </div>

        {/* Related */}
        <RelatedProducts currentId={product.id} category={product.category} />
      </div>
    </section>
  );
}
