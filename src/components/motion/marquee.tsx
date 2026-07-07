import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  /** Pause the loop while hovered. */
  pauseOnHover?: boolean;
  className?: string;
  trackClassName?: string;
}

/**
 * CSS-driven infinite scroller (server-renderable, zero JS). Content is
 * duplicated once; the track translates by -50% and loops seamlessly.
 * Stops entirely under `prefers-reduced-motion`.
 */
export function Marquee({
  children,
  duration = 42,
  pauseOnHover = true,
  className,
  trackClassName,
}: MarqueeProps) {
  return (
    <div className={cn("group/marquee overflow-hidden mask-fade-x", className)}>
      <div
        className={cn(
          "animate-marquee flex w-max items-center",
          pauseOnHover &&
            "group-hover/marquee:[animation-play-state:paused]",
          trackClassName,
        )}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
