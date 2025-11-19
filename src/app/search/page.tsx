// /app/search/page.tsx
import { Suspense } from "react";
import SearchClient from "./SearchClient";

export default function SearchPageWrapper() {
  return (
    <Suspense fallback={<div className="pt-28 text-center">Loading...</div>}>
      <SearchClient />
    </Suspense>
  );
}
