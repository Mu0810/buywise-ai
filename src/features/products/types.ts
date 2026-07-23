import type { Prisma } from "@/generated/prisma/client";

export type OfferWithStore = Prisma.ProductOfferGetPayload<{
  include: { store: true };
}>;

export type ProductWithOffers = Prisma.ProductGetPayload<{
  include: {
    brand: true;
    category: true;
    offers: { include: { store: true } };
  };
}>;

export type ProductDetail = Prisma.ProductGetPayload<{
  include: {
    brand: true;
    category: true;
    offers: { include: { store: true } };
    reviewAnalysis: true;
    priceHistory: true;
  };
}>;

export interface ProductListItem {
  product: ProductWithOffers;
  bestOffer: OfferWithStore | null;
  storeCount: number;
  lowestPrice: number | null;
  highestMrp: number | null;
  discountPercent: number;
}

export const SORT_OPTIONS = [
  "relevance",
  "price-asc",
  "price-desc",
  "rating",
  "ai-score",
  "value",
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export interface ProductFilters {
  query?: string;
  categorySlug?: string;
  brandSlugs?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOption;
  limit?: number;
  offset?: number;
  /** How multi-token text queries combine: "all" tokens (strict) or "any" (loose). */
  matchMode?: "all" | "any";
}
