import "server-only";

import Stripe from "stripe";

import { env } from "@/lib/env";

/**
 * Stripe client, or null when no secret key is configured. Callers must handle
 * the null case (billing disabled) gracefully.
 */
export const stripe: Stripe | null = env.STRIPE_SECRET_KEY
  ? new Stripe(env.STRIPE_SECRET_KEY)
  : null;

export const isBillingConfigured = env.STRIPE_SECRET_KEY.length > 0;
