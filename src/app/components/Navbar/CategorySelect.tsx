"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useRouter } from "next/navigation";

const categories = [
  "All Categories",
  "Antiques",
  "Art",
  "Baby",
  "Books",
  "Business & Industrial",
  "Cameras & Photo",
  "Cell Phones & Accessories",
  "Clothing, Shoes & Accessories",
  "Collectibles",
  "Computers/Tablets",
  "Electronics",
  "Health & Beauty",
  "Home & Garden",
  "Jewelry & Watches",
  "Music",
  "Pet Supplies",
  "Sporting Goods",
  "Toys & Hobbies",
];

export default function CategorySelect({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Stable slug converter
  const slugify = useCallback((str: string) => {
    return str.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");
  }, []);

  // Handle outside click
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  // Optimized click handler
  const handleSelect = useCallback(
    (cat: string) => {
      onChange(cat);
      setOpen(false);

      if (cat === "All Categories") {
        router.push(`/categories`);
      } else {
        router.push(`/categories/${slugify(cat)}`);
      }
    },
    [onChange, router, slugify]
  );

  // Precompute dropdown list
  const dropdownItems = useMemo(
    () =>
      categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleSelect(cat)}
          className={`block w-full text-left px-4 py-2 hover:bg-blue-600 hover:text-white ${
            selected === cat
              ? "bg-blue-600 text-white"
              : "text-gray-700"
          }`}
        >
          {cat}
        </button>
      )),
    [handleSelect, selected]
  );

  return (
    <div className="relative" ref={boxRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between bg-white border-l border-gray-300 px-4 py-2 rounded-r-full min-w-[140px] text-gray-700 hover:bg-gray-50 transition"
      >
        <span className="truncate">{selected}</span>
        <FiChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute top-full left-0 w-56 bg-white border shadow-lg rounded-md max-h-72 overflow-y-auto z-[9999]">
          {dropdownItems}
        </div>
      )}
    </div>
  );
}
