"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchProductsByIds } from "@/features/products/actions/products.actions";

/**
 * Hydrate full product data for a set of ids stored client-side (wishlist /
 * compare / alerts). Cached and re-fetched when the id set changes.
 */
export function useProductsByIds(ids: string[]) {
  return useQuery({
    queryKey: ["products-by-ids", [...ids].sort()],
    queryFn: () => fetchProductsByIds(ids),
    enabled: ids.length > 0,
    // Keep the previous list on id changes so removals animate out instead of
    // flashing back to a skeleton while the trimmed set refetches.
    placeholderData: (prev) => prev,
  });
}
