import "server-only";

import type { User as AuthUser } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { cache } from "react";

import { extractProfile } from "@/features/auth/lib/auth-user";
import type { User } from "@/generated/prisma/client";
import { logger } from "@/lib/logger";
import { createClient } from "@/lib/supabase/server";
import { getUserService } from "@/server/container";

/** The Supabase auth user for the current request (deduped per request). */
export const getAuthUser = cache(async (): Promise<AuthUser | null> => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    logger.warn("getAuthUser failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
});

/** The local profile for the current request, created lazily on first access. */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  const authUser = await getAuthUser();
  if (!authUser?.email) return null;

  const service = getUserService();
  const existing = await service.getProfile(authUser.id);
  if (existing) return existing;

  try {
    return await service.ensureProfile(extractProfile(authUser));
  } catch (error) {
    logger.error("Failed to load or create profile", {
      userId: authUser.id,
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
});

/** Require an authenticated user or redirect to login. */
export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

/** Require an admin user or redirect away. */
export async function requireAdmin(): Promise<User> {
  const user = await requireUser();
  if (user.role !== "ADMIN") redirect("/dashboard");
  return user;
}
