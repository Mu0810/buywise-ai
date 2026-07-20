"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";

import {
  EASE_OUT_EXPO,
  Magnetic,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion";
import { ButtonLink } from "@/components/ui/button-link";
import { cn, formatPrice } from "@/lib/utils";

import { pricingTiers } from "../data/pricing";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <section id="pricing" className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="hero-aurora animate-aurora absolute top-20 -left-1/4 -z-10 h-[40rem] w-[52rem] opacity-20 blur-3xl [animation-delay:-3s]"
      />
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title="Start free. Upgrade when you're ready."
            description="No credit card to begin. Cancel anytime. Prices in Indian Rupees."
          />
        </Reveal>
        <Reveal
          delay={0.05}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <span
            className={cn(
              "text-sm transition-colors",
              annual ? "text-muted-foreground" : "font-medium",
            )}
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
              "focus-visible:ring-ring relative h-7 w-12 rounded-full border transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
              annual
                ? "border-brand bg-brand shadow-brand/25 shadow-md"
                : "border-border bg-muted",
            )}
          >
            <motion.span
              aria-hidden
              animate={{ x: annual ? 20 : 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 500, damping: 30 }
              }
              className="bg-background absolute top-0.5 left-0.5 size-5 rounded-full shadow"
            />
          </button>
          <span
            className={cn(
              "text-sm transition-colors",
              annual ? "font-medium" : "text-muted-foreground",
            )}
          >
            Yearly <span className="text-brand">(2 months free)</span>
          </span>
        </Reveal>
        <StaggerGroup
          stagger={0.12}
          className="mt-14 grid gap-6 lg:grid-cols-3"
        >
          {pricingTiers.map((tier) => {
            const price = annual ? tier.yearly : tier.monthly;
            const period =
              tier.monthly === 0 ? "" : annual ? "/year" : "/month";
            return (
              <StaggerItem key={tier.name} className="h-full">
                <article
                  className={cn(
                    "motion-card group bg-card relative flex h-full flex-col overflow-hidden rounded-2xl border p-6",
                    tier.highlighted
                      ? "animated-border border-brand/50 shadow-brand/10 ring-brand/20 shadow-xl ring-1"
                      : "border-border/60",
                  )}
                >
                  <span className="card-sheen" aria-hidden />
                  {tier.highlighted && (
                    <span className="animate-bob bg-brand text-brand-foreground shadow-brand/30 absolute -top-3 left-6 z-10 inline-flex items-center gap-1 rounded-full px-3 py-0.5 font-mono text-[11px] font-semibold tracking-wide uppercase shadow-md">
                      <Sparkles className="size-3" />
                      Most popular
                    </span>
                  )}
                  <h3 className="font-display relative text-lg font-semibold">
                    {tier.name}
                  </h3>
                  <p className="text-muted-foreground relative mt-1 text-sm">
                    {tier.description}
                  </p>
                  <div className="relative mt-5 flex h-12 items-baseline gap-1 overflow-hidden">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={`${tier.name}-${annual}`}
                        initial={
                          reduceMotion
                            ? false
                            : { y: 18, opacity: 0, filter: "blur(4px)" }
                        }
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{
                          y: reduceMotion ? 0 : -18,
                          opacity: reduceMotion ? 1 : 0,
                          filter: reduceMotion ? "blur(0px)" : "blur(4px)",
                        }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.35,
                          ease: EASE_OUT_EXPO,
                        }}
                        className="font-mono text-4xl font-semibold tracking-tight tabular-nums"
                      >
                        {tier.monthly === 0 ? "Free" : formatPrice(price)}
                      </motion.span>
                    </AnimatePresence>
                    {period && (
                      <span className="text-muted-foreground text-sm">
                        {period}
                      </span>
                    )}
                  </div>
                  {tier.highlighted ? (
                    <Magnetic className="relative mt-6" strength={0.12}>
                      <ButtonLink className="w-full" href="/register">
                        {tier.cta}
                      </ButtonLink>
                    </Magnetic>
                  ) : (
                    <ButtonLink
                      className="relative mt-6 w-full"
                      variant="outline"
                      href="/register"
                    >
                      {tier.cta}
                    </ButtonLink>
                  )}
                  <ul className="relative mt-6 flex flex-col gap-3 text-sm">
                    {tier.features.map((feature, index) => (
                      <li
                        key={feature}
                        style={{ transitionDelay: `${index * 35}ms` }}
                        className="flex items-start gap-2 transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        <Check className="text-brand mt-0.5 size-4 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
