import { Quote, Star } from "lucide-react";

import { StaggerGroup, StaggerItem } from "@/components/motion";
import { cn, getInitials } from "@/lib/utils";

import { testimonials } from "../data/testimonials";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Testimonials() {
  return (
    <section className="border-border/60 bg-muted/20 relative isolate overflow-hidden border-y">
      <div
        aria-hidden
        className="hero-aurora animate-aurora absolute top-0 -right-1/4 -z-10 h-[36rem] w-[48rem] opacity-15 blur-3xl [animation-delay:-8s]"
      />
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Loved by smart shoppers"
            title="Thousands of better decisions"
            description="People across India use BuyWise to buy the right thing at the right price — the first time."
          />
        </Reveal>
        <StaggerGroup
          stagger={0.1}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={testimonial.name} className="h-full">
              <figure className="motion-card group border-border/60 bg-card relative flex h-full flex-col overflow-hidden rounded-2xl border p-6">
                <span className="card-sheen" aria-hidden />
                <Quote
                  aria-hidden
                  className="text-brand/[0.08] group-hover:text-brand/15 absolute top-5 right-5 size-10 transition-all duration-500 group-hover:scale-125 group-hover:-rotate-6"
                />
                <div className="relative flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star
                      key={star}
                      style={{ transitionDelay: `${star * 45}ms` }}
                      className={cn(
                        "size-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110",
                        star < testimonial.rating
                          ? "fill-brand text-brand"
                          : "text-muted-foreground/30",
                      )}
                    />
                  ))}
                </div>
                <blockquote className="text-foreground/90 relative mt-4 flex-1 text-sm leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="relative mt-6 flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-10 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white shadow-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg",
                      testimonial.gradient,
                    )}
                  >
                    {getInitials(testimonial.name)}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-medium">
                      {testimonial.name}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {testimonial.role}
                    </span>
                  </span>
                  <span className="text-muted-foreground/40 ml-auto font-mono text-[10px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </figcaption>
                <span
                  aria-hidden
                  className="from-brand absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r to-transparent transition-transform duration-700 group-hover:scale-x-100"
                />
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
