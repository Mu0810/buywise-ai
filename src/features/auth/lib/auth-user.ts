import type { User as AuthUser } from "@supabase/supabase-js";

import type { UpsertUserInput } from "@/features/users/repositories/user.repository";

/**
 * Map a Supabase auth user onto our local profile shape, reading the common
 * OAuth metadata keys for display name and avatar.
 */
export function extractProfile(user: AuthUser): UpsertUserInput {
  const metadata = user.user_metadata ?? {};
  const name =
    (metadata.full_name as string | undefined) ??
    (metadata.name as string | undefined) ??
    null;
  const avatarUrl =
    (metadata.avatar_url as string | undefined) ??
    (metadata.picture as string | undefined) ??
    null;

  return {
    id: user.id,
    email: user.email ?? "",
    name,
    avatarUrl,
  };
}

/**
 * Guard against open redirects: only allow same-site absolute paths.
 */
export function safeRedirectPath(path: string | null, fallback = "/dashboard"): string {
  if (!path) return fallback;
  if (!path.startsWith("/") || path.startsWith("//")) return fallback;
  return path;
}
