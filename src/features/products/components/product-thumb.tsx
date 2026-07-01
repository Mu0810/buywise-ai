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
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-indigo-500/10",
        className,
      )}
    >
      <div aria-hidden className="bg-grid absolute inset-0 opacity-40" />
      <Icon className="relative size-12 text-brand/50" strokeWidth={1.5} />
    </div>
  );
}
