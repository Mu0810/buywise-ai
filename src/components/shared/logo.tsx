import { Sparkles } from "lucide-react";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  href?: string;
  showWordmark?: boolean;
}

export function Logo({ className, href = "/", showWordmark = true }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={siteConfig.name}
      className={cn(
        "group flex items-center gap-2 font-semibold tracking-tight",
        className,
      )}
    >
      <span className="relative flex size-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-500 text-white shadow-sm ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105">
        <Sparkles className="size-4" strokeWidth={2.5} />
      </span>
      {showWordmark && (
        <span className="text-base">
          BuyWise<span className="text-brand"> AI</span>
        </span>
      )}
    </Link>
  );
}
