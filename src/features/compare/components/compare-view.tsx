"use client";

import { GitCompareArrows, X } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { EmptyState } from "@/components/shared/empty-state";
import { ButtonLink } from "@/components/ui/button-link";
import { Skeleton } from "@/components/ui/skeleton";
import { useCompareStore } from "@/features/compare/store";
import { useProductsByIds } from "@/features/products/hooks/use-products-by-ids";
import type { ProductListItem } from "@/features/products/types";
import { useMounted } from "@/hooks/use-mounted";
import { formatPrice } from "@/lib/utils";

const ROWS: { label: string; value: (item: ProductListItem) => ReactNode }[] = [
  { label: "Best price", value: (i) => (i.lowestPrice != null ? formatPrice(i.lowestPrice) : "—") },
  { label: "AI score", value: (i) => i.product.aiScore ?? "—" },
  { label: "Rating", value: (i) => (i.product.rating != null ? `${i.product.rating} ★` : "—") },
  { label: "Performance", value: (i) => i.product.performanceScore ?? "—" },
  { label: "Battery", value: (i) => i.product.batteryScore ?? "—" },
  { label: "Display", value: (i) => i.product.displayScore ?? "—" },
  { label: "Camera", value: (i) => i.product.cameraScore ?? "—" },
  { label: "Value", value: (i) => i.product.valueScore ?? "—" },
  { label: "Stores", value: (i) => i.storeCount },
  { label: "Warranty", value: (i) => (i.product.warrantyMonths != null ? `${i.product.warrantyMonths} mo` : "—") },
];

function specsOf(item: ProductListItem): Record<string, string> {
  return (item.product.keySpecs ?? {}) as Record<string, string>;
}

export function CompareView() {
  const mounted = useMounted();
  const ids = useCompareStore((s) => s.ids);
  const removeFromCompare = useCompareStore((s) => s.remove);
  const { data, isLoading } = useProductsByIds(ids);
  const items = data ?? [];

  if (!mounted || isLoading) {
    return <Skeleton className="h-96 rounded-2xl" />;
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold tracking-tight">Compare</h1>
        <EmptyState
          icon={GitCompareArrows}
          title="Nothing to compare yet"
          description="Add products to compare them side by side on specs, scores and price."
          action={
            <ButtonLink href="/search" variant="outline">
              Browse products
            </ButtonLink>
          }
        />
      </div>
    );
  }

  const specKeys = [
    ...new Set(items.flatMap((item) => Object.keys(specsOf(item)))),
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        Compare {items.length} products
      </h1>
      <div className="overflow-x-auto rounded-2xl border border-border/60">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border/60">
              <th className="w-40 p-4" />
              {items.map((item) => (
                <th key={item.product.id} className="p-4 align-top">
                  <div className="flex flex-col items-start gap-2">
                    <div className="flex w-full items-start justify-between gap-2">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="line-clamp-2 text-left font-medium hover:text-brand"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        type="button"
                        aria-label="Remove from comparison"
                        onClick={() => removeFromCompare(item.product.id)}
                        className="shrink-0 text-muted-foreground hover:text-foreground"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {item.product.brand.name}
                    </span>
                    <ButtonLink
                      href={`/products/${item.product.slug}`}
                      size="sm"
                      variant="outline"
                    >
                      View
                    </ButtonLink>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr
                key={row.label}
                className="border-b border-border/40 last:border-0"
              >
                <td className="p-4 font-medium text-muted-foreground">
                  {row.label}
                </td>
                {items.map((item) => (
                  <td key={item.product.id} className="p-4 text-center">
                    {row.value(item)}
                  </td>
                ))}
              </tr>
            ))}
            {specKeys.map((key) => (
              <tr key={key} className="border-b border-border/40 last:border-0">
                <td className="p-4 font-medium text-muted-foreground">{key}</td>
                {items.map((item) => (
                  <td key={item.product.id} className="p-4 text-center">
                    {specsOf(item)[key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
