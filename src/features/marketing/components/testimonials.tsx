import { Star } from "lucide-react";

import { StaggerGroup, StaggerItem } from "@/components/motion";
import { cn, getInitials } from "@/lib/utils";

import { testimonials } from "../data/testimonials";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Testimonials() {
  return (
    <section className="border-y border-border/60 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Loved by smart shoppers"
            title="Thousands of better decisions"
            description="People across India use BuyWise to buy the right thing at the right price — the first time."
          />
        </Reveal>
        <StaggerGroup
          stagger={0.06}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.name} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star
                      key={star}
                      className={cn(
                        "size-4",
                        star < testimonial.rating
                          ? "fill-brand text-brand"
                          : "text-muted-foreground/30",
                      )}
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-10 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white",
                      testimonial.gradient,
                    )}
                  >
                    {getInitials(testimonial.name)}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-medium">
                      {testimonial.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
