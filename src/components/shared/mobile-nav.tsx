"use client";

import type { User as AuthUser } from "@supabase/supabase-js";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { marketingNav } from "@/config/navigation";

export function MobileNav({ user }: { user: AuthUser | null }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={(next) => setOpen(next)}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle className="text-left">
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-2">
          {marketingNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 p-4">
          {user ? (
            <ButtonLink href="/dashboard" onClick={close}>
              Go to dashboard
            </ButtonLink>
          ) : (
            <>
              <ButtonLink variant="outline" href="/login" onClick={close}>
                Sign in
              </ButtonLink>
              <ButtonLink href="/register" onClick={close}>
                Get started
              </ButtonLink>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
