"use client";

import type { User as AuthUser } from "@supabase/supabase-js";

import { NavLinks } from "@/components/app/nav-links";
import { Logo } from "@/components/shared/logo";
import { UserMenu } from "@/components/shared/user-menu";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

export function AppSidebar({
  user,
  className,
}: {
  user: AuthUser | null;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "w-64 shrink-0 flex-col border-r border-border/60 bg-card/40",
        className,
      )}
    >
      <div className="flex h-16 items-center px-5">
        <Logo href="/dashboard" />
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <NavLinks />
      </div>
      <div className="border-t border-border/60 p-3">
        {user ? (
          <div className="flex items-center gap-2">
            <UserMenu user={user} />
            <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
              {user.email}
            </span>
          </div>
        ) : (
          <ButtonLink href="/login" variant="outline" className="w-full">
            Sign in
          </ButtonLink>
        )}
      </div>
    </aside>
  );
}
