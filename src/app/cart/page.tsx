"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../components/context/CartContext";
import { useMemo } from "react";

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  // Optimized total calculation
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  const isEmpty = cart.length === 0;

  return (
    <section className="pt-10 pb-12 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Cart</h1>

        {/* EMPTY CART */}
        {isEmpty ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
            <Link
              href="/products"
              className="mt-4 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">

            {/* LEFT SIDE — ITEMS */}
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-white p-4 rounded-xl shadow"
                >
                  {/* IMAGE */}
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={120}
                    height={120}
                    className="rounded-lg object-cover"
                  />

                  {/* DETAILS */}
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </h2>

                    <p className="text-indigo-600 font-bold text-lg">
                      ₹{item.price}
                    </p>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-3 py-1 bg-gray-200 rounded-lg"
                      >
                        –
                      </button>

                      <span className="font-semibold">{item.qty}</span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-3 py-1 bg-gray-200 rounded-lg"
                      >
                        +
                      </button>
                    </div>

                    {/* REMOVE */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-3 text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE — TOTAL */}
            <div className="bg-white p-6 rounded-xl shadow h-fit">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>

              <div className="flex justify-between text-lg">
                <p>Total:</p>
                <p className="font-bold text-indigo-600">₹{total}</p>
              </div>

              <button className="mt-6 w-full px-6 py-3 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition">
                Proceed to Checkout
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
