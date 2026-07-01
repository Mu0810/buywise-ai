"use client";

import { Heart } from "lucide-react";
import type { MouseEvent } from "react";

import { useWishlistStore } from "@/features/wishlist/store";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

export function WishlistButton({
  productId,
  className,
  withLabel = false,
}: {
  productId: string;
  className?: string;
  withLabel?: boolean;
}) {
  const mounted = useMounted();
  const active = useWishlistStore((s) => s.ids.includes(productId));
  const toggle = useWishlistStore((s) => s.toggle);
  const on = mounted && active;

  function onClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    toggle(productId);
  }

  return (
    <button
      type="button"
      aria-label={on ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={on}
      onClick={onClick}
      className={cn("inline-flex items-center gap-1.5", className)}
    >
      <Heart
        className={cn(
          "size-4 transition-colors",
          on && "fill-red-500 text-red-500",
        )}
      />
      {withLabel && <span className="text-sm">{on ? "Saved" : "Save"}</span>}
    </button>
  );
}
