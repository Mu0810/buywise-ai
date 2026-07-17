import { SearchX } from "lucide-react";
import type { Metadata } from "next";

import { EmptyState } from "@/components/shared/empty-state";
import { getAuthUser } from "@/features/auth/lib/current-user";
import { ProductCard } from "@/features/products/components/product-card";
import { SearchBar } from "@/features/search/components/search-bar";
import { SearchControls } from "@/features/search/components/search-controls";
import { detectCategory, extractBudget } from "@/features/search/lib/query-parser";
import { parseFilters, type RawParams } from "@/features/search/lib/search-params";
import { formatPrice } from "@/lib/utils";
import { getProductService, getSearchService } from "@/server/container";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<RawParams>;
}) {
  const params = await searchParams;
  const filters = parseFilters(params);
  const displayQuery = filters.query;
  if (filters.query) {
    const inferredCategory =
      filters.categorySlug ?? detectCategory(filters.query);
    filters.maxPrice ??= extractBudget(filters.query);
    filters.categorySlug = inferredCategory;
    // A natural-language query ("coding laptop under 70k") resolves to a
    // category + budget; don't also match the whole phrase against product names.
    if (inferredCategory) filters.query = undefined;
  }

  const [items, categories] = await Promise.all([
    getProductService().search(filters),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { slug: true, name: true },
    }),
  ]);

  const user = await getAuthUser();
  if (user && displayQuery) {
    await getSearchService()
      .record({
        userId: user.id,
        query: displayQuery,
        category: filters.categorySlug ?? null,
        resultCount: items.length,
      })
      .catch(() => undefined);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="animate-enter flex flex-col gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Search</h1>
        <SearchBar defaultValue={displayQuery ?? ""} autoFocus={!displayQuery} />
        {displayQuery && (
          <p
            className="animate-enter text-sm text-muted-foreground"
            style={{ "--stagger": 1 } as React.CSSProperties}
          >
            {items.length} result{items.length === 1 ? "" : "s"} for{" "}
            <span className="font-medium text-foreground">
              &ldquo;{displayQuery}&rdquo;
            </span>
            {filters.maxPrice ? ` under ${formatPrice(filters.maxPrice)}` : ""}
          </p>
        )}
      </div>
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside
          className="animate-enter lg:sticky lg:top-20 lg:self-start"
          style={{ "--stagger": 2 } as React.CSSProperties}
        >
          <SearchControls categories={categories} />
        </aside>
        <div>
          {items.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No products found"
              description="Try a broader search, remove a filter, or ask the AI assistant to help you find the right product."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((item, index) => (
                <div
                  key={item.product.id}
                  className="animate-enter"
                  style={{ "--stagger": Math.min(index, 11) } as React.CSSProperties}
                >
                  <ProductCard item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
