import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * An empty screen is an invitation to act: gold-lit icon, plain words, and
 * the action front and centre. Enters softly via the CSS `animate-enter`.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "animate-enter flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/60 py-20 text-center",
        className,
      )}
    >
      <span className="flex size-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
        <Icon className="size-7" strokeWidth={1.75} />
      </span>
      <p className="mt-1 font-medium">{title}</p>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}
