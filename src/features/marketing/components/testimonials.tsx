import { Star } from "lucide-react";

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
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={(index % 3) * 0.05}>
              <figure className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star
                      key={star}
                      className={cn(
                        "size-4",
                        star < testimonial.rating
                          ? "fill-amber-400 text-amber-400"
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
