"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpAction } from "@/features/auth/actions/auth.actions";
import { initialAuthState } from "@/features/auth/types";

import { FieldError, FormError, FormSuccess } from "./form-messages";
import { OAuthButtons } from "./oauth-buttons";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    signUpAction,
    initialAuthState,
  );

  if (state.success) {
    return (
      <div className="flex flex-col gap-4">
        <FormSuccess message={state.message} />
        <ButtonLink variant="outline" href="/login">
          Back to sign in
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <OAuthButtons />
      <div className="relative text-center text-xs text-muted-foreground">
        <span className="relative z-10 bg-card px-2">or sign up with email</span>
        <span className="absolute inset-x-0 top-1/2 h-px bg-border" />
      </div>
      <form action={formAction} className="flex flex-col gap-4">
        <FormError message={state.error} />
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Ada Lovelace"
            required
          />
          <FieldError errors={state.fieldErrors?.name} />
        </div>
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
            autoComplete="new-password"
            placeholder="At least 8 characters"
            required
          />
          <FieldError errors={state.fieldErrors?.password} />
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Creating account&hellip;
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
