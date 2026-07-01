"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { appNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

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
              <span className="ml-auto rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium">
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
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-brand/10 text-brand"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <item.icon className="size-4" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
