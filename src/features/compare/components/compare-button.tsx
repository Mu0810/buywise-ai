"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, GitCompareArrows } from "lucide-react";
import type { MouseEvent } from "react";
import { toast } from "sonner";

import { MAX_COMPARE, useCompareStore } from "@/features/compare/store";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

export function CompareButton({
  productId,
  className,
  withLabel = false,
}: {
  productId: string;
  className?: string;
  withLabel?: boolean;
}) {
  const mounted = useMounted();
  const active = useCompareStore((s) => s.ids.includes(productId));
  const toggle = useCompareStore((s) => s.toggle);
  const on = mounted && active;

  function onClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const added = toggle(productId);
    if (!added && !on) {
      toast.error(`You can compare up to ${MAX_COMPARE} products at once.`);
    }
  }

  return (
    <motion.button
      type="button"
      aria-label={on ? "Remove from comparison" : "Add to comparison"}
      aria-pressed={on}
      onClick={onClick}
      whileTap={{ scale: 0.85 }}
      className={cn("inline-flex items-center gap-1.5", className)}
    >
      <span className="relative inline-flex size-4">
        <AnimatePresence initial={false} mode="popLayout">
          {on ? (
            <motion.span
              key="check"
              initial={{ scale: 0.4, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.4, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex"
            >
              <Check className="size-4 text-brand" />
            </motion.span>
          ) : (
            <motion.span
              key="compare"
              initial={{ scale: 0.4, opacity: 0, rotate: 45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.4, opacity: 0, rotate: -45 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex"
            >
              <GitCompareArrows className="size-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      {withLabel && <span className="text-sm">{on ? "Added" : "Compare"}</span>}
    </motion.button>
  );
}
