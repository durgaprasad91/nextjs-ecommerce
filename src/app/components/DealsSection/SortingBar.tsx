"use client";

import React, { useMemo, useCallback } from "react";

interface SortingBarProps {
  sortBy: string;
  onChange: (value: string) => void;
}

function SortingBarComponent({ sortBy, onChange }: SortingBarProps) {
  // Memoize button list (static data)
  const buttons = useMemo(
    () => [
      { id: "relevance", label: "Relevance" },
      { id: "low-high", label: "Price: Low → High" },
      { id: "high-low", label: "Price: High → Low" },
      { id: "rating", label: "Rating" },
      { id: "newest", label: "Newest" },
    ],
    []
  );

  // Prevent re-creation of function on every render
  const handleClick = useCallback(
    (id: string) => {
      onChange(id);
    },
    [onChange]
  );

  return (
    <div className="w-full mb-6">
      <div
        className="
          flex gap-3 
          overflow-x-auto 
          pb-2 
          scrollbar-hide 
          md:flex-wrap md:overflow-visible
        "
      >
        {buttons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => handleClick(btn.id)}
            className={`px-4 py-2 whitespace-nowrap rounded-xl border transition
              ${
                sortBy === btn.id
                  ? "bg-indigo-600 text-white shadow-md border-indigo-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
              }
            `}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default React.memo(SortingBarComponent);
