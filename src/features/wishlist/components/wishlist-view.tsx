"use client";

import { Heart } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { ButtonLink } from "@/components/ui/button-link";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/features/products/components/product-card";
import { useProductsByIds } from "@/features/products/hooks/use-products-by-ids";
import { useWishlistStore } from "@/features/wishlist/store";
import { useMounted } from "@/hooks/use-mounted";

function GridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-72 rounded-2xl" />
      ))}
    </div>
  );
}

export function WishlistView() {
  const mounted = useMounted();
  const ids = useWishlistStore((s) => s.ids);
  const { data: items, isLoading } = useProductsByIds(ids);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Wishlist</h1>
        <p className="mt-1 text-muted-foreground">
          {mounted
            ? `${ids.length} saved ${ids.length === 1 ? "product" : "products"}`
            : "Your saved products"}
        </p>
      </div>
      {!mounted || isLoading ? (
        <GridSkeleton />
      ) : ids.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Save products you're interested in and track them all in one place."
          action={
            <ButtonLink href="/search" variant="outline">
              Browse products
            </ButtonLink>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items?.map((item) => (
            <ProductCard key={item.product.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
