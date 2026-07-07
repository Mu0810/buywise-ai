import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  href?: string;
  showWordmark?: boolean;
}

/**
 * The BuyWise mark: a gold verdict tile stamped with a display-face B.
 * Matches the favicon and OG image.
 */
export function Logo({ className, href = "/", showWordmark = true }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={siteConfig.name}
      className={cn(
        "group flex items-center gap-2.5 font-semibold tracking-tight",
        className,
      )}
    >
      <span className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--grad-gold-1)] to-[var(--grad-gold-3)] font-display text-lg font-bold text-[oklch(0.19_0.02_235)] shadow-sm ring-1 ring-brand/30 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-105">
        B
      </span>
      {showWordmark && (
        <span className="font-display text-base">
          BuyWise<span className="text-brand"> AI</span>
        </span>
      )}
    </Link>
  );
}
