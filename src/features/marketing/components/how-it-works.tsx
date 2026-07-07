import { cn } from "@/lib/utils";

import { StaggerGroup, StaggerItem } from "@/components/motion";

import { steps } from "../data/steps";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

/**
 * A real sequence, so it earns its numbers. Steps 1–3 wear signal teal (the
 * research in progress); the final step lands in gold (the verdict).
 */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-border/60 bg-muted/20">
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
            className="absolute inset-x-12 top-[4.35rem] hidden border-t border-dashed border-border lg:block"
          />
          <StaggerGroup
            stagger={0.09}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((step, index) => {
              const isVerdict = index === steps.length - 1;
              return (
                <StaggerItem key={step.title} className="h-full">
                  <div className="group relative h-full rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
                    <span
                      className={cn(
                        "font-mono text-xs font-semibold tracking-wider",
                        isVerdict ? "text-brand" : "text-signal",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div
                      className={cn(
                        "mt-3 flex size-11 items-center justify-center rounded-xl shadow-sm transition-transform duration-300 group-hover:-rotate-6",
                        isVerdict
                          ? "bg-brand text-brand-foreground shadow-brand/30"
                          : "bg-signal/12 text-signal",
                      )}
                    >
                      <step.icon className="size-5" />
                    </div>
                    <h3 className="mt-4 font-sans font-medium">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
