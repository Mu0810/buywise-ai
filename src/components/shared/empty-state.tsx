import type { LucideIcon } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

const stagger = (index: number) => ({ "--stagger": index }) as CSSProperties;

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
      <span
        className="animate-pop-in flex size-14 items-center justify-center rounded-2xl bg-brand/10 text-brand"
        style={{ animationDelay: "120ms" }}
      >
        <Icon className="size-7" strokeWidth={1.75} />
      </span>
      <p className="animate-enter mt-1 font-medium" style={stagger(3)}>
        {title}
      </p>
      <p
        className="animate-enter max-w-sm text-sm text-muted-foreground"
        style={stagger(4)}
      >
        {description}
      </p>
      {action && (
        <div className="animate-enter" style={stagger(5)}>
          {action}
        </div>
      )}
    </div>
  );
}
