"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { safeRedirectPath } from "@/features/auth/lib/auth-user";
import {
  loginSchema,
  registerSchema,
} from "@/features/auth/schemas/auth.schema";
import type { AuthActionState } from "@/features/auth/types";
import { env } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { getClientIp, rateLimit } from "@/server/rate-limit";

export async function signInAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  const ip = getClientIp(await headers());
  const limited = await rateLimit({
    key: `login:${ip}:${parsed.data.email}`,
    limit: 5,
    windowMs: 60_000,
  });
  if (!limited.success) {
    return { error: "Too many attempts. Please wait a minute and try again." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect(safeRedirectPath(formData.get("redirectTo") as string | null));
}

export async function signUpAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  const ip = getClientIp(await headers());
  const limited = await rateLimit({
    key: `signup:${ip}`,
    limit: 5,
    windowMs: 60 * 60_000,
  });
  if (!limited.success) {
    return { error: "Too many sign-up attempts. Please try again later." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.name },
      emailRedirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });
  if (error) {
    return { error: error.message };
  }

  // Email confirmation required: session is null until the user confirms.
  if (data.user && !data.session) {
    return {
      success: true,
      message: "Almost there — check your inbox to confirm your email.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signOutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signInWithGoogleAction(): Promise<void> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });
  if (error || !data.url) {
    redirect("/login?error=oauth");
  }
  redirect(data.url);
}
