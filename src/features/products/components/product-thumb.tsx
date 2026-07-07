import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Product thumbnail placeholder. The catalog ships without hosted imagery, so
 * we render a branded gradient tile with the category icon instead of a broken
 * image. Real product images can be dropped in later without layout changes.
 */
export function ProductThumb({
  Icon,
  className,
}: {
  Icon: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand/10 via-transparent to-signal/10",
        className,
      )}
    >
      <div aria-hidden className="bg-grid absolute inset-0 opacity-40" />
      <Icon
        className="relative size-12 text-brand/50 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3"
        strokeWidth={1.5}
      />
    </div>
  );
}
