import { ArrowUpRight, Shield, Star } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import { AddAlertButton } from "@/features/alerts/components/add-alert-button";
import { getAuthUser } from "@/features/auth/lib/current-user";
import { CompareButton } from "@/features/compare/components/compare-button";
import { PriceComparison } from "@/features/products/components/price-comparison";
import { PriceHistoryChart } from "@/features/products/components/price-history-chart";
import { ProductScores } from "@/features/products/components/product-scores";
import { ProductThumb } from "@/features/products/components/product-thumb";
import { ReviewAnalysis } from "@/features/products/components/review-analysis";
import { WishlistButton } from "@/features/wishlist/components/wishlist-button";
import { categoryIcon } from "@/features/products/lib/category-icon";
import { pickBestOffer } from "@/features/products/services/product.service";
import { ScoreRing } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button-link";
import { JsonLd } from "@/components/shared/json-ld";
import { formatCompactNumber, formatPrice } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { getProductService } from "@/server/container";

const getProduct = cache((slug: string) =>
  getProductService().getBySlug(slug),
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.shortDescription ?? undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const user = await getAuthUser();
  if (user) {
    await prisma.recentlyViewed
      .upsert({
        where: { userId_productId: { userId: user.id, productId: product.id } },
        update: { viewedAt: new Date() },
        create: { userId: user.id, productId: product.id },
      })
      .catch(() => undefined);
  }

  const bestOffer = pickBestOffer(product.offers);
  const specs = (product.keySpecs ?? {}) as Record<string, string>;
  const Icon = categoryIcon(product.category.slug);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription ?? undefined,
    brand: { "@type": "Brand", name: product.brand.name },
    category: product.category.name,
    ...(product.rating != null
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
        }
      : {}),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: bestOffer?.price,
      highPrice: product.offers.reduce((m, o) => Math.max(m, o.price), 0),
      offerCount: product.offers.length,
    },
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10">
      <JsonLd data={productLd} />
      <div className="flex flex-col gap-2">
        <Link
          href={`/search?category=${product.category.slug}`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          &larr; {product.category.name}
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {product.name}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span>{product.brand.name}</span>
              {product.rating != null && (
                <span className="flex items-center gap-1">
                  <Star className="size-4 fill-brand text-brand" />
                  {product.rating} &middot; {formatCompactNumber(product.reviewCount)}{" "}
                  reviews
                </span>
              )}
              {product.warrantyMonths != null && (
                <span className="flex items-center gap-1">
                  <Shield className="size-3.5" /> {product.warrantyMonths}-month
                  warranty
                </span>
              )}
            </div>
          </div>
          {product.aiScore != null && (
            <div className="flex items-center gap-3 rounded-2xl border border-brand/30 bg-brand/5 px-4 py-2.5">
              <ScoreRing score={product.aiScore} size={52} strokeWidth={4.5} />
              <div className="flex flex-col">
                <span className="text-sm font-medium">AI score</span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  out of 100
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col gap-6">
          <ProductThumb
            Icon={Icon}
            className="aspect-[16/10] rounded-2xl border border-border/60"
          />
          {product.description && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          )}
          {Object.keys(specs).length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-medium">Key specifications</h2>
              <dl className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                {Object.entries(specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between gap-4 border-b border-border/40 py-1.5 text-sm"
                  >
                    <dt className="text-muted-foreground">{key}</dt>
                    <dd className="text-right font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Best price</p>
                <p className="text-2xl font-semibold">
                  {bestOffer ? formatPrice(bestOffer.price) : "\u2014"}
                </p>
              </div>
              {bestOffer && (
                <span className="text-sm text-muted-foreground">
                  at {bestOffer.store.name}
                </span>
              )}
            </div>
            {bestOffer && (
              <ButtonLink
                href={bestOffer.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 w-full gap-1.5"
              >
                View best deal <ArrowUpRight className="size-4" />
              </ButtonLink>
            )}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <WishlistButton
                productId={product.id}
                withLabel
                className="justify-center rounded-lg border border-border py-2 text-muted-foreground hover:text-foreground"
              />
              <CompareButton
                productId={product.id}
                withLabel
                className="justify-center rounded-lg border border-border py-2 text-muted-foreground hover:text-foreground"
              />
            </div>
            <div className="mt-2">
              <AddAlertButton
                productId={product.id}
                currentPrice={bestOffer?.price ?? null}
              />
            </div>
          </div>
          <div>
            <h2 className="mb-2 text-sm font-medium">
              Compare {product.offers.length} stores
            </h2>
            <PriceComparison offers={product.offers} />
          </div>
        </div>
      </div>

      {[
        product.performanceScore,
        product.batteryScore,
        product.displayScore,
        product.cameraScore,
        product.valueScore,
        product.buildScore,
        product.repairScore,
      ].some((s) => s != null) && (
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Performance scores</h2>
          <ProductScores product={product} />
        </section>
      )}

      {product.reviewAnalysis && (
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Review intelligence</h2>
          <ReviewAnalysis analysis={product.reviewAnalysis} />
        </section>
      )}

      {product.priceHistory.length >= 2 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Price history</h2>
          <PriceHistoryChart history={product.priceHistory} />
        </section>
      )}
    </div>
  );
}
