import { steps } from "../data/steps";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-y border-border/60 bg-muted/20"
    >
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="From question to confident purchase"
            description="Four simple steps. No spreadsheets, no endless tabs, no second-guessing."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.06}>
              <div className="h-full rounded-2xl border border-border/60 bg-card p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                  Step {index + 1}
                </span>
                <div className="mt-3 flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 text-white shadow-sm">
                  <step.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
