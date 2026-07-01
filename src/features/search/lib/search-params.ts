import {
  SORT_OPTIONS,
  type ProductFilters,
  type SortOption,
} from "@/features/products/types";

export type RawParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function positiveInt(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : undefined;
}

/** Parse URL search params into typed product filters. */
export function parseFilters(params: RawParams): ProductFilters {
  const query = first(params.q)?.trim() || undefined;
  const categorySlug = first(params.category) || undefined;
  const brand = first(params.brand) || undefined;
  const sortRaw = first(params.sort);
  const sort: SortOption = SORT_OPTIONS.includes(sortRaw as SortOption)
    ? (sortRaw as SortOption)
    : "relevance";

  return {
    query,
    categorySlug,
    brandSlugs: brand ? [brand] : undefined,
    minPrice: positiveInt(first(params.min)),
    maxPrice: positiveInt(first(params.max)),
    sort,
  };
}
