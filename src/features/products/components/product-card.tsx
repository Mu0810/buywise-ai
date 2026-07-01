import { Star } from "lucide-react";
import Link from "next/link";

import { ProductThumb } from "@/features/products/components/product-thumb";
import { CompareButton } from "@/features/compare/components/compare-button";
import { WishlistButton } from "@/features/wishlist/components/wishlist-button";
import { categoryIcon } from "@/features/products/lib/category-icon";
import type { ProductListItem } from "@/features/products/types";
import { Badge } from "@/components/ui/badge";
import { formatCompactNumber, formatPrice } from "@/lib/utils";

const overlayButton =
  "flex size-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:text-foreground";

export function ProductCard({ item }: { item: ProductListItem }) {
  const { product, lowestPrice, discountPercent, storeCount } = item;
  const Icon = categoryIcon(product.category.slug);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg">
      <Link href={`/products/${product.slug}`} className="flex flex-1 flex-col">
        <ProductThumb Icon={Icon} className="aspect-[4/3]" />
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-xs text-muted-foreground">
              {product.brand.name}
            </span>
            {product.aiScore != null && (
              <Badge variant="secondary" className="shrink-0 gap-1 text-xs">
                <span className="font-semibold text-brand">AI</span>
                {product.aiScore}
              </Badge>
            )}
          </div>
          <h3 className="line-clamp-2 min-h-10 text-sm font-medium">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            {product.rating ?? "\u2014"}
            <span className="text-muted-foreground/50">&middot;</span>
            {formatCompactNumber(product.reviewCount)} reviews
          </div>
          <div className="mt-auto flex items-end justify-between pt-2">
            <div>
              <p className="text-lg font-semibold">
                {lowestPrice != null ? formatPrice(lowestPrice) : "\u2014"}
              </p>
              {discountPercent > 0 && (
                <p className="text-xs font-medium text-success">
                  {discountPercent}% off
                </p>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {storeCount} {storeCount === 1 ? "store" : "stores"}
            </span>
          </div>
        </div>
      </Link>
      <div className="absolute right-2 top-2 z-10 flex gap-1.5">
        <WishlistButton productId={product.id} className={overlayButton} />
        <CompareButton productId={product.id} className={overlayButton} />
      </div>
    </div>
  );
}
