"use client";

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
    <button
      type="button"
      aria-label={on ? "Remove from comparison" : "Add to comparison"}
      aria-pressed={on}
      onClick={onClick}
      className={cn("inline-flex items-center gap-1.5", className)}
    >
      {on ? (
        <Check className="size-4 text-brand" />
      ) : (
        <GitCompareArrows className="size-4" />
      )}
      {withLabel && <span className="text-sm">{on ? "Added" : "Compare"}</span>}
    </button>
  );
}
