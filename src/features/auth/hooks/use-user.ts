"use client";

import type { User as AuthUser } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

/**
 * Client-side auth state. Reads the current user and subscribes to auth changes
 * so navigation reflects sign-in / sign-out without a full reload. Keeps
 * marketing pages statically rendered while still showing the right CTA.
 */
export function useUser() {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    supabase.auth
      .getUser()
      .then(({ data }) => {
        if (!active) return;
        setUser(data.user);
        setIsLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setUser(null);
        setIsLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  return { user, isLoading, isAuthenticated: user !== null };
}
