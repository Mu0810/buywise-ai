"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASE_OUT_EXPO, StaggerGroup, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

import { steps } from "../data/steps";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

/**
 * A real sequence, so it earns its numbers. Steps 1–3 wear signal teal (the
 * research in progress); the final step lands in gold (the verdict).
 */
export function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className="border-border/60 bg-muted/20 relative isolate overflow-hidden border-y"
    >
      <div
        aria-hidden
        className="hero-aurora animate-aurora absolute top-0 -left-1/4 -z-10 h-[34rem] w-[46rem] opacity-15 blur-3xl [animation-delay:-5s]"
      />
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="From question to confident purchase"
            description="Four steps. No spreadsheets, no endless tabs, no second-guessing."
          />
        </Reveal>
        <div className="relative mt-14">
          <div
            aria-hidden
            className="bg-border absolute inset-x-12 top-[4.35rem] hidden h-px overflow-visible lg:block"
          >
            <motion.div
              className="from-signal via-signal to-brand h-full origin-left bg-gradient-to-r shadow-[0_0_10px_color-mix(in_oklch,var(--signal)_50%,transparent)]"
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{
                duration: reduceMotion ? 0 : 1.5,
                delay: reduceMotion ? 0 : 0.2,
                ease: EASE_OUT_EXPO,
              }}
            />
          </div>
          <StaggerGroup
            stagger={0.12}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((step, index) => {
              const isVerdict = index === steps.length - 1;
              return (
                <StaggerItem key={step.title} className="h-full">
                  <article className="motion-card group border-border/60 bg-card relative h-full overflow-hidden rounded-2xl border p-6">
                    <span className="card-sheen" aria-hidden />
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "font-mono text-xs font-semibold tracking-wider",
                          isVerdict ? "text-brand" : "text-signal",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "size-2 rounded-full ring-4 transition-all duration-500 group-hover:scale-125",
                          isVerdict
                            ? "animate-pulse-ring bg-brand ring-brand/10"
                            : "bg-signal ring-signal/10",
                        )}
                      />
                    </div>
                    <div
                      className={cn(
                        "relative mt-3 flex size-11 items-center justify-center rounded-xl shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6",
                        isVerdict
                          ? "bg-brand text-brand-foreground shadow-brand/30"
                          : "bg-signal/12 text-signal group-hover:bg-signal group-hover:text-signal-foreground",
                      )}
                    >
                      <step.icon className="size-5" />
                    </div>
                    <h3 className="relative mt-4 font-sans font-medium">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground relative mt-2 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
