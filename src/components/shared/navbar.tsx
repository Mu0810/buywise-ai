"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Logo } from "@/components/shared/logo";
import { MobileNav } from "@/components/shared/mobile-nav";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { UserMenu } from "@/components/shared/user-menu";
import { ButtonLink } from "@/components/ui/button-link";
import { Skeleton } from "@/components/ui/skeleton";
import { marketingNav } from "@/config/navigation";
import { useUser } from "@/features/auth/hooks/use-user";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { user, isLoading } = useUser();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {marketingNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden items-center gap-2 md:flex">
            {isLoading ? (
              <Skeleton className="h-8 w-36" />
            ) : user ? (
              <>
                <ButtonLink variant="ghost" href="/dashboard">
                  Dashboard
                </ButtonLink>
                <UserMenu user={user} />
              </>
            ) : (
              <>
                <ButtonLink variant="ghost" href="/login">
                  Sign in
                </ButtonLink>
                <ButtonLink href="/register">Get started</ButtonLink>
              </>
            )}
          </div>
          <MobileNav user={user} />
        </div>
      </div>
    </header>
  );
}
