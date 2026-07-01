"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInAction } from "@/features/auth/actions/auth.actions";
import { initialAuthState } from "@/features/auth/types";

import { FieldError, FormError } from "./form-messages";
import { OAuthButtons } from "./oauth-buttons";

export function LoginForm({
  redirectTo,
  initialError,
}: {
  redirectTo?: string;
  initialError?: string;
}) {
  const [state, formAction, pending] = useActionState(signInAction, {
    ...initialAuthState,
    ...(initialError ? { error: initialError } : {}),
  });

  return (
    <div className="flex flex-col gap-6">
      <OAuthButtons />
      <div className="relative text-center text-xs text-muted-foreground">
        <span className="relative z-10 bg-card px-2">or continue with email</span>
        <span className="absolute inset-x-0 top-1/2 h-px bg-border" />
      </div>
      <form action={formAction} className="flex flex-col gap-4">
        {redirectTo && (
          <input type="hidden" name="redirectTo" value={redirectTo} />
        )}
        <FormError message={state.error} />
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
          <FieldError errors={state.fieldErrors?.email} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Your password"
            required
          />
          <FieldError errors={state.fieldErrors?.password} />
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Signing in&hellip;
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
