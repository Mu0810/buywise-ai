import { StaggerGroup, StaggerItem } from "@/components/motion";

import { features } from "../data/features";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function FeaturesShowcase() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <Reveal>
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to buy with confidence"
          description="From the first question to the final purchase, BuyWise handles the research so you can decide in minutes."
        />
      </Reveal>
      <StaggerGroup
        stagger={0.06}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {features.map((feature) => (
          <StaggerItem key={feature.title} className="h-full">
            <div className="group h-full rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5">
              <div className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-all duration-300 group-hover:-rotate-6 group-hover:bg-brand group-hover:text-brand-foreground group-hover:shadow-md group-hover:shadow-brand/30">
                <feature.icon className="size-5" />
              </div>
              <h3 className="mt-4 font-sans font-medium">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
