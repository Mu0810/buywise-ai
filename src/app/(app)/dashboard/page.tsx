import { ArrowRight, Clock, Search, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { requireUser } from "@/features/auth/lib/current-user";
import { DashboardStats } from "@/features/dashboard/components/dashboard-stats";
import { ProductCard } from "@/features/products/components/product-card";
import { prisma } from "@/lib/prisma";
import { getProductService, getSearchService } from "@/server/container";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const user = await requireUser();
  const productService = getProductService();

  const [recentViews, recentSearches, recommendations] = await Promise.all([
    prisma.recentlyViewed.findMany({
      where: { userId: user.id },
      orderBy: { viewedAt: "desc" },
      take: 4,
      select: { productId: true },
    }),
    getSearchService().getRecent(user.id, 6),
    productService.getRecommendations(6),
  ]);

  const recentlyViewed = recentViews.length
    ? await productService.getByIds(recentViews.map((r) => r.productId))
    : [];
  const firstName = user.name?.split(" ")[0] ?? "there";

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s your shopping snapshot.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/chat"
          className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 via-transparent to-signal/10 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/10"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand text-brand-foreground">
            <Sparkles className="size-5" />
          </span>
          <span className="flex-1">
            <span className="block font-medium">Ask BuyWise AI</span>
            <span className="block text-sm text-muted-foreground">
              Describe what you need and get recommendations
            </span>
          </span>
          <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="/search"
          className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-brand/40"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted">
            <Search className="size-5" />
          </span>
          <span className="flex-1">
            <span className="block font-medium">Search products</span>
            <span className="block text-sm text-muted-foreground">
              Browse and compare across every store
            </span>
          </span>
          <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <DashboardStats
        shoppingScore={user.shoppingScore}
        moneySaved={user.moneySaved}
      />

      {recentSearches.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Clock className="size-4" /> Recent searches
          </h2>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((s) => (
              <Link
                key={s.id}
                href={`/search?q=${encodeURIComponent(s.query)}`}
                className="rounded-full border border-border/60 px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
              >
                {s.query}
              </Link>
            ))}
          </div>
        </section>
      )}

      {recentlyViewed.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Recently viewed</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentlyViewed.map((item, index) => (
              <div
                key={item.product.id}
                className="animate-enter"
                style={{ "--stagger": index } as React.CSSProperties}
              >
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recommended for you</h2>
          <Link href="/search" className="text-sm text-brand hover:underline">
            Browse all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((item, index) => (
            <div
              key={item.product.id}
              className="animate-enter"
              style={{ "--stagger": index } as React.CSSProperties}
            >
              <ProductCard item={item} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
