import "server-only";

import type Stripe from "stripe";

import {
  planForPriceId,
  priceIdFor,
  type BillingInterval,
  type BillingPlan,
} from "@/features/billing/config";
import { stripe } from "@/features/billing/lib/stripe";
import type { PrismaClient, SubscriptionStatus } from "@/generated/prisma/client";

export class BillingError extends Error {}

function mapStatus(status: Stripe.Subscription.Status): SubscriptionStatus {
  switch (status) {
    case "active":
      return "ACTIVE";
    case "trialing":
      return "TRIALING";
    case "past_due":
    case "unpaid":
      return "PAST_DUE";
    case "canceled":
      return "CANCELED";
    default:
      return "INCOMPLETE";
  }
}

function periodEnd(sub: Stripe.Subscription): Date | null {
  const raw = sub as unknown as {
    current_period_end?: number;
    items?: { data?: Array<{ current_period_end?: number }> };
  };
  const ts = raw.current_period_end ?? raw.items?.data?.[0]?.current_period_end;
  return typeof ts === "number" ? new Date(ts * 1000) : null;
}

export class BillingService {
  constructor(private readonly db: PrismaClient) {}

  private requireStripe(): Stripe {
    if (!stripe) {
      throw new BillingError("Billing is not configured.");
    }
    return stripe;
  }

  private async ensureCustomer(userId: string, email: string): Promise<string> {
    const existing = await this.db.subscription.findUnique({
      where: { userId },
    });
    if (existing?.stripeCustomerId) return existing.stripeCustomerId;

    const customer = await this.requireStripe().customers.create({
      email,
      metadata: { userId },
    });
    await this.db.subscription.upsert({
      where: { userId },
      update: { stripeCustomerId: customer.id },
      create: { userId, stripeCustomerId: customer.id },
    });
    return customer.id;
  }

  async createCheckout(input: {
    userId: string;
    email: string;
    plan: BillingPlan;
    interval: BillingInterval;
    appUrl: string;
  }): Promise<string> {
    const client = this.requireStripe();
    const priceId = priceIdFor(input.plan, input.interval);
    if (!priceId) {
      throw new BillingError("This plan is not available for purchase yet.");
    }
    const customer = await this.ensureCustomer(input.userId, input.email);
    const session = await client.checkout.sessions.create({
      mode: "subscription",
      customer,
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${input.appUrl}/subscription?status=success`,
      cancel_url: `${input.appUrl}/subscription?status=cancelled`,
      subscription_data: { metadata: { userId: input.userId } },
    });
    if (!session.url) throw new BillingError("Could not start checkout.");
    return session.url;
  }

  async createPortal(input: {
    userId: string;
    appUrl: string;
  }): Promise<string> {
    const client = this.requireStripe();
    const sub = await this.db.subscription.findUnique({
      where: { userId: input.userId },
    });
    if (!sub?.stripeCustomerId) {
      throw new BillingError("No billing account found.");
    }
    const session = await client.billingPortal.sessions.create({
      customer: sub.stripeCustomerId,
      return_url: `${input.appUrl}/subscription`,
    });
    return session.url;
  }

  async syncSubscription(subscription: Stripe.Subscription): Promise<void> {
    const customerId =
      typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer.id;
    const priceId = subscription.items.data[0]?.price.id;
    const plan: BillingPlan | "FREE" =
      (priceId ? planForPriceId(priceId) : null) ?? "FREE";

    const existing = await this.db.subscription.findFirst({
      where: { stripeCustomerId: customerId },
    });
    const userId = existing?.userId ?? subscription.metadata.userId;
    if (!userId) return;

    const data = {
      plan,
      status: mapStatus(subscription.status),
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId ?? null,
      currentPeriodEnd: periodEnd(subscription),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    };
    await this.db.subscription.upsert({
      where: { userId },
      update: data,
      create: { userId, ...data },
    });
    await this.db.user.update({ where: { id: userId }, data: { plan } });
  }
}
