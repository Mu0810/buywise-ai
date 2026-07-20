import { Sparkles } from "lucide-react";

import { StaggerGroup, StaggerItem } from "@/components/motion";

import { features } from "../data/features";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function FeaturesShowcase() {
  return (
    <section id="features" className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="hero-aurora animate-aurora absolute top-10 -right-1/4 -z-10 h-[32rem] w-[42rem] opacity-20 blur-3xl"
      />
      <span
        aria-hidden
        className="animate-twinkle bg-brand absolute top-28 left-[8%] -z-10 size-1.5 rounded-full"
      />
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Features"
            title="Everything you need to buy with confidence"
            description="From the first question to the final purchase, BuyWise handles the research so you can decide in minutes."
          />
        </Reveal>
        <StaggerGroup
          stagger={0.08}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <StaggerItem key={feature.title} className="h-full">
              <article className="motion-card group border-border/60 bg-card relative h-full overflow-hidden rounded-2xl border p-6">
                <span className="card-sheen" aria-hidden />
                <div className="text-muted-foreground/50 absolute top-5 right-5 flex items-center gap-1 font-mono text-[10px]">
                  <Sparkles className="size-3 opacity-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:opacity-100" />
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="bg-brand/10 text-brand group-hover:bg-brand group-hover:text-brand-foreground group-hover:shadow-brand/30 relative flex size-11 items-center justify-center rounded-xl shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-lg">
                  <feature.icon className="size-5" />
                  <span className="bg-brand/25 absolute inset-0 -z-10 rounded-xl opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <h3 className="relative mt-4 font-sans font-medium">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground relative mt-2 text-sm leading-relaxed">
                  {feature.description}
                </p>
                <span
                  aria-hidden
                  className="from-brand via-signal absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100"
                />
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
