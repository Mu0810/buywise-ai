import { NextResponse, type NextRequest } from "next/server";

import { extractProfile, safeRedirectPath } from "@/features/auth/lib/auth-user";
import { logger } from "@/lib/logger";
import { createClient } from "@/lib/supabase/server";
import { getUserService } from "@/server/container";

/**
 * OAuth / magic-link callback. Exchanges the auth code for a session, ensures a
 * local profile exists, then redirects to the requested destination.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirectTo = safeRedirectPath(searchParams.get("redirectTo"));

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user?.email) {
    logger.warn("OAuth code exchange failed", { error: error?.message });
    return NextResponse.redirect(`${origin}/login?error=auth`);
  }

  try {
    await getUserService().ensureProfile(extractProfile(data.user));
  } catch (profileError) {
    logger.error("Failed to sync profile after OAuth", {
      error:
        profileError instanceof Error
          ? profileError.message
          : String(profileError),
    });
  }

  return NextResponse.redirect(`${origin}${redirectTo}`);
}
