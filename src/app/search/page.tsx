"use client";

import { useSearchParams } from "next/navigation";
import { allProducts } from "../MockData/allProducts";
import ProductsGrid from "../components/DealsSection/ProductsGrid";
import SortingBar from "../components/DealsSection/SortingBar";
import { useState, useMemo } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const [sortBy, setSortBy] = useState("relevance");

  // Filter products based on search term
  const results = useMemo(() => {
    if (!query) return [];

    return allProducts.filter((p) =>
      p.title.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query)
    );
  }, [query]);

  return (
    <section className="pt-28 pb-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Search Results for: <span className="text-indigo-600">{query}</span>
        </h1>

        <SortingBar sortBy={sortBy} onChange={setSortBy} />

        {results.length === 0 ? (
          <div className="text-center py-20 text-gray-600 text-lg">
            No products found.
          </div>
        ) : (
          <ProductsGrid filters={{}} sortBy={sortBy} overrideProducts={results} />
        )}

      </div>
    </section>
  );
}
