"use client";

import { Check, Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import {
  createBillingPortalSession,
  createCheckoutSession,
} from "@/features/billing/actions/billing.actions";
import type { BillingPlan } from "@/features/billing/config";
import { pricingTiers } from "@/features/marketing/data/pricing";
import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";

interface BillingViewProps {
  currentPlan: "FREE" | "PREMIUM" | "FAMILY";
  isConfigured: boolean;
  renewalDate: string | null;
  checkoutStatus: "success" | "cancelled" | null;
}

export function BillingView({
  currentPlan,
  isConfigured,
  renewalDate,
  checkoutStatus,
}: BillingViewProps) {
  const [annual, setAnnual] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (checkoutStatus === "success") {
      toast.success("You're subscribed — welcome to Premium!");
    } else if (checkoutStatus === "cancelled") {
      toast("Checkout cancelled.");
    }
  }, [checkoutStatus]);

  function upgrade(plan: BillingPlan) {
    startTransition(async () => {
      const result = await createCheckoutSession({
        plan,
        interval: annual ? "yearly" : "monthly",
      });
      if (result.url) window.location.href = result.url;
      else toast.error(result.error ?? "Something went wrong.");
    });
  }

  function manageBilling() {
    startTransition(async () => {
      const result = await createBillingPortalSession();
      if (result.url) window.location.href = result.url;
      else toast.error(result.error ?? "Something went wrong.");
    });
  }

  const isPaid = currentPlan !== "FREE";
  const planLabel =
    currentPlan === "FREE"
      ? "Free"
      : currentPlan === "PREMIUM"
        ? "Premium"
        : "Family";

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Subscription</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your BuyWise plan and billing.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card p-5">
        <div>
          <p className="text-sm text-muted-foreground">Current plan</p>
          <p className="text-xl font-semibold">{planLabel}</p>
          {renewalDate && (
            <p className="mt-1 text-sm text-muted-foreground">
              Renews {renewalDate}
            </p>
          )}
        </div>
        {isPaid && (
          <Button variant="outline" onClick={manageBilling} disabled={pending}>
            Manage billing
          </Button>
        )}
      </div>

      {!isConfigured && (
        <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm text-orange-600 dark:text-orange-400">
          Billing isn&apos;t configured in this environment. Add your Stripe
          secret key and price IDs to <code>.env</code> to enable checkout.
        </div>
      )}

      <div className="flex items-center justify-center gap-3">
        <span
          className={cn("text-sm", annual ? "text-muted-foreground" : "font-medium")}
        >
          Monthly
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={annual}
          aria-label="Toggle annual billing"
          onClick={() => setAnnual((v) => !v)}
          className={cn(
            "relative h-6 w-11 rounded-full transition-colors",
            annual ? "bg-brand" : "bg-muted",
          )}
        >
          <span
            className={cn(
              "absolute left-0.5 top-0.5 size-5 rounded-full bg-background shadow transition-transform",
              annual && "translate-x-5",
            )}
          />
        </button>
        <span
          className={cn("text-sm", annual ? "font-medium" : "text-muted-foreground")}
        >
          Yearly <span className="text-brand">(2 months free)</span>
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier) => {
          const isFree = tier.monthly === 0;
          const planKey = tier.name.toUpperCase() as BillingPlan;
          const isCurrent = currentPlan === (isFree ? "FREE" : planKey);
          const price = annual ? tier.yearly : tier.monthly;
          return (
            <div
              key={tier.name}
              className={cn(
                "flex flex-col rounded-2xl border bg-card p-6",
                tier.highlighted
                  ? "border-brand/50 ring-1 ring-brand/20"
                  : "border-border/60",
              )}
            >
              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {tier.description}
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-semibold">
                  {isFree ? "Free" : formatPrice(price)}
                </span>
                {!isFree && (
                  <span className="text-sm text-muted-foreground">
                    {annual ? "/year" : "/month"}
                  </span>
                )}
              </div>
              <div className="mt-5">
                {isCurrent ? (
                  <Button variant="outline" className="w-full" disabled>
                    Current plan
                  </Button>
                ) : isFree ? (
                  <Button variant="outline" className="w-full" disabled>
                    Included
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    disabled={!isConfigured || pending}
                    onClick={() => upgrade(planKey)}
                  >
                    {pending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      `Upgrade to ${tier.name}`
                    )}
                  </Button>
                )}
              </div>
              <ul className="mt-6 flex flex-col gap-2.5 text-sm">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
