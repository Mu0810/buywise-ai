"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId } from "react";

import { appNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

/**
 * App navigation with a shared-layout active pill: the gold wash slides
 * between items as you move through the app instead of blinking on and off.
 */
export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  // Sidebar and mobile sheet render this list simultaneously; a unique
  // layout id per instance keeps their pills from fighting each other.
  const layoutId = useId();

  return (
    <nav className="flex flex-col gap-1">
      {appNav.map((item) => {
        if (item.soon) {
          return (
            <span
              key={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground/50"
            >
              <item.icon className="size-4" />
              {item.title}
              <span className="ml-auto rounded-full bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase">
                Soon
              </span>
            </span>
          );
        }
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
              active
                ? "text-brand"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className="absolute inset-0 rounded-lg bg-brand/10 ring-1 ring-brand/20"
              />
            )}
            {!active && (
              <span className="absolute inset-0 rounded-lg bg-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            )}
            <item.icon
              className={cn(
                "relative size-4 transition-transform duration-200 ease-out",
                !active && "group-hover:scale-110",
              )}
            />
            <span className="relative">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
