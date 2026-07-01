"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { cn, formatPrice } from "@/lib/utils";

import { pricingTiers } from "../data/pricing";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section
      id="pricing"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <Reveal>
        <SectionHeading
          eyebrow="Pricing"
          title="Start free. Upgrade when you're ready."
          description="No credit card to begin. Cancel anytime. Prices in Indian Rupees."
        />
      </Reveal>
      <Reveal delay={0.05} className="mt-8 flex items-center justify-center gap-3">
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
          onClick={() => setAnnual((value) => !value)}
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
      </Reveal>
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier, index) => {
          const price = annual ? tier.yearly : tier.monthly;
          const period =
            tier.monthly === 0 ? "" : annual ? "/year" : "/month";
          return (
            <Reveal key={tier.name} delay={index * 0.06}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-6",
                  tier.highlighted
                    ? "border-brand/50 bg-card shadow-lg ring-1 ring-brand/20"
                    : "border-border/60 bg-card",
                )}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-0.5 text-xs font-medium text-brand-foreground">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {tier.description}
                </p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight">
                    {tier.monthly === 0 ? "Free" : formatPrice(price)}
                  </span>
                  {period && (
                    <span className="text-sm text-muted-foreground">
                      {period}
                    </span>
                  )}
                </div>
                <ButtonLink
                  className="mt-6"
                  variant={tier.highlighted ? "default" : "outline"}
                  href="/register"
                >
                  {tier.cta}
                </ButtonLink>
                <ul className="mt-6 flex flex-col gap-3 text-sm">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
