import type { Metadata } from "next";

import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = { title: "Sign in" };

const ERROR_MESSAGES: Record<string, string> = {
  auth: "We couldn't sign you in. Please check your details and try again.",
  oauth: "Google sign-in didn't complete. Please try again.",
  missing_code: "That sign-in link was invalid or has expired.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string; error?: string }>;
}) {
  const params = await searchParams;
  const initialError = params.error
    ? (ERROR_MESSAGES[params.error] ?? "Something went wrong. Please try again.")
    : undefined;

  return (
    <div>
      <div className="mb-8 space-y-1.5">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to continue to BuyWise AI.
        </p>
      </div>
      <LoginForm redirectTo={params.redirectTo} initialError={initialError} />
    </div>
  );
}
