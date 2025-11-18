"use client";

import { useState, useCallback, useMemo } from "react";
import FiltersSidebar from "../components/DealsSection/FiltersSidebar";
import ProductsGrid from "../components/DealsSection/ProductsGrid";
import SortingBar from "../components/DealsSection/SortingBar";
import Link from "next/link";

export default function ProductsPage() {
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("relevance");

  // Memoized empty filter object (prevents new {} object every render)
  const defaultFilters = useMemo(() => ({}), []);

  // Stable callbacks
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(defaultFilters); // uses memoized object
  }, [defaultFilters]);

  const handleSortChange = useCallback((value) => {
    setSortBy(value);
  }, []);

  return (
    <section className="pt-10 pb-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">

        {/* Back Button */}
        <Link
          href="/"
          className="inline-block mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          ← Back to Home
        </Link>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">

          {/* FILTER SIDEBAR */}
          <div className="md:col-span-1 sticky top-28">
            <FiltersSidebar
              onFilterChange={handleFilterChange}
              onClear={handleClearFilters}
            />
          </div>

          {/* RIGHT SECTION */}
          <div className="md:col-span-3">
            <SortingBar sortBy={sortBy} onChange={handleSortChange} />
            <ProductsGrid filters={filters} sortBy={sortBy} />
          </div>

        </div>
      </div>
    </section>
  );
}
