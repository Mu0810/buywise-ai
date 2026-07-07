"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

import { EASE_OUT_EXPO, StaggerGroup, StaggerItem } from "@/components/motion";
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
            "relative h-6 w-11 rounded-full transition-colors duration-300",
            annual ? "bg-brand" : "bg-muted",
          )}
        >
          <span
            className={cn(
              "absolute left-0.5 top-0.5 size-5 rounded-full bg-background shadow transition-transform duration-300 ease-out",
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
      <StaggerGroup stagger={0.08} className="mt-14 grid gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier) => {
          const price = annual ? tier.yearly : tier.monthly;
          const period = tier.monthly === 0 ? "" : annual ? "/year" : "/month";
          return (
            <StaggerItem key={tier.name} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border bg-card p-6 transition-all duration-300 ease-out hover:-translate-y-1",
                  tier.highlighted
                    ? "border-brand/50 shadow-xl shadow-brand/10 ring-1 ring-brand/25 hover:shadow-brand/20"
                    : "border-border/60 hover:shadow-lg",
                )}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-brand-foreground shadow-md shadow-brand/30">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold">
                  {tier.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {tier.description}
                </p>
                <div className="mt-5 flex h-12 items-baseline gap-1 overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={`${tier.name}-${annual}`}
                      initial={{ y: 18, opacity: 0, filter: "blur(4px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: -18, opacity: 0, filter: "blur(4px)" }}
                      transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                      className="font-mono text-4xl font-semibold tracking-tight tabular-nums"
                    >
                      {tier.monthly === 0 ? "Free" : formatPrice(price)}
                    </motion.span>
                  </AnimatePresence>
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
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
