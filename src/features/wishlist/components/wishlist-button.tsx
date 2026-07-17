"use client";

import { AnimatePresence, motion } from "framer-motion";
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
    <motion.button
      type="button"
      aria-label={on ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={on}
      onClick={onClick}
      whileTap={{ scale: 0.85 }}
      className={cn("relative inline-flex items-center gap-1.5", className)}
    >
      <motion.span
        initial={false}
        animate={
          on ? { scale: [1, 1.35, 1], rotate: [0, -8, 0] } : { scale: 1 }
        }
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative inline-flex"
      >
        <Heart
          className={cn(
            "size-4 transition-colors",
            on && "fill-red-500 text-red-500",
          )}
        />
        {/* One-shot burst ring on save. */}
        <AnimatePresence>
          {on && (
            <motion.span
              initial={{ scale: 0.4, opacity: 0.7 }}
              animate={{ scale: 1.9, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="pointer-events-none absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/60"
            />
          )}
        </AnimatePresence>
      </motion.span>
      {withLabel && <span className="text-sm">{on ? "Saved" : "Save"}</span>}
    </motion.button>
  );
}
