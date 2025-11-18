"use client";
import React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";

const CATEGORIES = ["Mobiles", "Fashion", "Electronics", "Home", "Beauty", "Grocery"];
const BRANDS = ["Apple", "Samsung", "Puma", "Boat", "Nike", "Lenovo", "OnePlus"];
const RATINGS = [4, 3, 2, 1];

export default function FiltersSidebar({
  onFilterChange,
  onClear,
}: {
  onFilterChange: (filters: any) => void;
  onClear: () => void;
}) {
  const [openMobile, setOpenMobile] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedMinPrice, setSelectedMinPrice] = useState<number | null>(null);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number | null>(null);

  // 🔥 Memoized filters object
  const filters = useMemo(
    () => ({
      categories: selectedCategories,
      brands: selectedBrands,
      rating: selectedRating,
      minPrice: selectedMinPrice,
      maxPrice: selectedMaxPrice,
    }),
    [
      selectedCategories,
      selectedBrands,
      selectedRating,
      selectedMinPrice,
      selectedMaxPrice,
    ]
  );

  // 🔥 Notify parent only when filters change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  // 🔥 Clear filters handler
  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedRating(null);
    setSelectedMinPrice(null);
    setSelectedMaxPrice(null);

    onFilterChange({});
    onClear();
  }, [onFilterChange, onClear]);

  // 🔥 Handlers created once
  const toggleCategory = useCallback(
    (cat: string) => {
      setSelectedCategories((prev) =>
        prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
      );
    },
    []
  );

  const toggleBrand = useCallback(
    (brand: string) => {
      setSelectedBrands((prev) =>
        prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
      );
    },
    []
  );

  const changeRating = useCallback((rate: number) => {
    setSelectedRating(rate);
  }, []);

  const changeMinPrice = useCallback((e: any) => {
    setSelectedMinPrice(e.target.value ? Number(e.target.value) : null);
  }, []);

  const changeMaxPrice = useCallback((e: any) => {
    setSelectedMaxPrice(e.target.value ? Number(e.target.value) : null);
  }, []);

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        className="md:hidden w-full bg-indigo-600 text-white py-3 px-4 rounded-xl font-semibold mb-4 flex justify-between items-center"
        onClick={() => setOpenMobile((prev) => !prev)}
      >
        Filters
        <span>{openMobile ? "▲" : "▼"}</span>
      </button>

      {/* MOBILE COLLAPSE */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          openMobile ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border rounded-2xl p-5 shadow-md mt-2 mb-4">
          <FiltersUI
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            selectedRating={selectedRating}
            selectedMinPrice={selectedMinPrice}
            selectedMaxPrice={selectedMaxPrice}
            toggleCategory={toggleCategory}
            toggleBrand={toggleBrand}
            changeRating={changeRating}
            changeMinPrice={changeMinPrice}
            changeMaxPrice={changeMaxPrice}
            clearFilters={clearFilters}
          />
        </div>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:block bg-white shadow-lg border border-gray-200 rounded-2xl p-6 sticky top-28 h-fit">
        <FiltersUI
          selectedCategories={selectedCategories}
          selectedBrands={selectedBrands}
          selectedRating={selectedRating}
          selectedMinPrice={selectedMinPrice}
          selectedMaxPrice={selectedMaxPrice}
          toggleCategory={toggleCategory}
          toggleBrand={toggleBrand}
          changeRating={changeRating}
          changeMinPrice={changeMinPrice}
          changeMaxPrice={changeMaxPrice}
          clearFilters={clearFilters}
        />
      </aside>
    </>
  );
}

/* ------------------ FILTER UI (memoized) ------------------ */
const FiltersUI = React.memo(
  ({
    selectedCategories,
    selectedBrands,
    selectedRating,
    selectedMinPrice,
    selectedMaxPrice,
    toggleCategory,
    toggleBrand,
    changeRating,
    changeMinPrice,
    changeMaxPrice,
    clearFilters,
  }: any) => {
    return (
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Filters</h2>

        {/* CATEGORY */}
        <Section title="Category">
          {CATEGORIES.map((cat) => (
            <Checkbox
              key={cat}
              label={cat}
              checked={selectedCategories.includes(cat)}
              onChange={() => toggleCategory(cat)}
            />
          ))}
        </Section>

        {/* RATING */}
        <Section title="Rating">
          {RATINGS.map((rate) => (
            <Radio
              key={rate}
              label={`⭐ ${rate} & above`}
              checked={selectedRating === rate}
              onChange={() => changeRating(rate)}
            />
          ))}
        </Section>

        {/* BRAND */}
        <Section title="Brand">
          <div className="space-y-2 h-32 overflow-y-auto pr-2">
            {BRANDS.map((brand) => (
              <Checkbox
                key={brand}
                label={brand}
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
            ))}
          </div>
        </Section>

        {/* PRICE */}
        <Section title="Price Range">
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="Min"
              className="border rounded-lg w-24 px-2 py-1"
              value={selectedMinPrice ?? ""}
              onChange={changeMinPrice}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              className="border rounded-lg w-24 px-2 py-1"
              value={selectedMaxPrice ?? ""}
              onChange={changeMaxPrice}
            />
          </div>

          <input
            type="range"
            min="0"
            max="20000"
            step="100"
            className="w-full mt-3 accent-indigo-600"
            value={selectedMaxPrice ?? 0}
            onChange={changeMaxPrice}
          />

          <p className="text-sm text-gray-500 mt-1">Up to ₹{selectedMaxPrice ?? 0}</p>
        </Section>

        <button
          onClick={clearFilters}
          className="w-full py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition mt-4"
        >
          Clear Filters
        </button>
      </div>
    );
  }
);

/* ----------------- SMALL COMPONENTS ------------------ */

const Section = React.memo(function Section({ title, children }: any) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
});

const Checkbox = React.memo(function Checkbox({ label, checked, onChange }: any) {
  return (
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        className="h-4 w-4 accent-indigo-600"
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  );
});

const Radio = React.memo(function Radio({ label, checked, onChange }: any) {
  return (
    <label className="flex items-center gap-3">
      <input
        type="radio"
        className="h-4 w-4 accent-indigo-600"
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  );
});
