"use client";

import type { User as AuthUser } from "@supabase/supabase-js";
import { Menu } from "lucide-react";
import { useState } from "react";

import { NavLinks } from "@/components/app/nav-links";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { UserMenu } from "@/components/shared/user-menu";
import { NotificationsBell } from "@/features/notifications/components/notifications-bell";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function AppTopbar({ user }: { user: AuthUser | null }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <Sheet open={open} onOpenChange={(next) => setOpen(next)}>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" />
          }
        >
          <Menu className="size-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <SheetHeader>
            <SheetTitle className="text-left">
              <Logo href="/dashboard" />
            </SheetTitle>
          </SheetHeader>
          <div className="px-3 pb-4">
            <NavLinks onNavigate={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
      <div className="lg:hidden">
        <Logo href="/dashboard" showWordmark={false} />
      </div>
      <div className="ml-auto flex items-center gap-2">
        {user && <NotificationsBell />}
        <ThemeToggle />
        {user ? (
          <UserMenu user={user} />
        ) : (
          <ButtonLink href="/login" variant="outline" size="sm">
            Sign in
          </ButtonLink>
        )}
      </div>
    </header>
  );
}
