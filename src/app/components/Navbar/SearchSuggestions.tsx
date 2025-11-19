"use client";

import Link from "next/link";
import { memo } from "react";

type Props = {
  suggestions: string[];
  onSelect: () => void;
};

function SearchSuggestions({ suggestions, onSelect }: Props) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="absolute left-0 top-full mt-2 w-full bg-white border shadow-lg rounded-md z-[9999] p-2 animate-scaleIn">
      {suggestions.map((item) => (
        <Link
          key={item}
          href={`/search?q=${encodeURIComponent(item)}`}
          onClick={onSelect}
          className="block px-3 py-2 hover:bg-gray-100 text-gray-700 rounded"
        >
          {item}
        </Link>
      ))}
    </div>
  );
}

export default memo(SearchSuggestions);
