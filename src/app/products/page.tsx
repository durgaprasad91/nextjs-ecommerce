"use client";

import { useState, useCallback, useMemo } from "react";
import FiltersSidebar from "../components/DealsSection/FiltersSidebar";
import ProductsGrid from "../components/DealsSection/ProductsGrid";
import SortingBar from "../components/DealsSection/SortingBar";
import Link from "next/link";

/** Minimal product filters shape — extend if your sidebar sends more fields */
type Filters = {
  categories?: string[];
  brands?: string[];
  rating?: number;
  minPrice?: number;
  maxPrice?: number;
};

/** If you have fixed sort options, you can replace string with union type:
 * type SortBy = "relevance" | "low-high" | "high-low" | "rating" | "newest";
 */
type SortBy = string;

export default function ProductsPage() {
  const [filters, setFilters] = useState<Filters>({});
  const [sortBy, setSortBy] = useState<SortBy>("relevance");

  // Memoized empty filter object (prevents new {} object every render)
  const defaultFilters = useMemo<Filters>(() => ({}), []);

  // Stable callbacks with proper parameter types
  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(defaultFilters); // uses memoized object
  }, [defaultFilters]);

  const handleSortChange = useCallback((value: SortBy) => {
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
