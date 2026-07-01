"use server";

import {
  type BillingInterval,
  type BillingPlan,
} from "@/features/billing/config";
import { BillingError } from "@/features/billing/services/billing.service";
import { getAuthUser, getCurrentUser } from "@/features/auth/lib/current-user";
import { env } from "@/lib/env";
import { getBillingService } from "@/server/container";

export async function createCheckoutSession(input: {
  plan: BillingPlan;
  interval: BillingInterval;
}): Promise<{ url?: string; error?: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: "Please sign in to upgrade." };
  try {
    const url = await getBillingService().createCheckout({
      userId: user.id,
      email: user.email,
      plan: input.plan,
      interval: input.interval,
      appUrl: env.NEXT_PUBLIC_APP_URL,
    });
    return { url };
  } catch (error) {
    return {
      error:
        error instanceof BillingError
          ? error.message
          : "Could not start checkout. Please try again.",
    };
  }
}

export async function createBillingPortalSession(): Promise<{
  url?: string;
  error?: string;
}> {
  const user = await getAuthUser();
  if (!user) return { error: "Please sign in." };
  try {
    const url = await getBillingService().createPortal({
      userId: user.id,
      appUrl: env.NEXT_PUBLIC_APP_URL,
    });
    return { url };
  } catch (error) {
    return {
      error:
        error instanceof BillingError
          ? error.message
          : "Could not open the billing portal.",
    };
  }
}
