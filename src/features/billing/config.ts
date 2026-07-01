import "server-only";

import { env } from "@/lib/env";

export type BillingPlan = "PREMIUM" | "FAMILY";
export type BillingInterval = "monthly" | "yearly";

const PRICE_MAP: Record<BillingPlan, Record<BillingInterval, string>> = {
  PREMIUM: {
    monthly: env.STRIPE_PRICE_PREMIUM_MONTHLY,
    yearly: env.STRIPE_PRICE_PREMIUM_YEARLY,
  },
  FAMILY: {
    monthly: env.STRIPE_PRICE_FAMILY_MONTHLY,
    yearly: env.STRIPE_PRICE_FAMILY_YEARLY,
  },
};

export function priceIdFor(plan: BillingPlan, interval: BillingInterval): string {
  return PRICE_MAP[plan][interval];
}

/** Reverse-map a Stripe price id back to a plan (for webhook handling). */
export function planForPriceId(priceId: string): BillingPlan | null {
  for (const plan of ["PREMIUM", "FAMILY"] as const) {
    if (
      priceId === PRICE_MAP[plan].monthly ||
      priceId === PRICE_MAP[plan].yearly
    ) {
      return plan;
    }
  }
  return null;
}
