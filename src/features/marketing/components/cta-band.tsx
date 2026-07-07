import { ArrowRight } from "lucide-react";

import { Magnetic } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button-link";

import { Reveal } from "./reveal";

/**
 * Closing band: the page ends where it began — in ink, with a gold verdict.
 */
export function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="dark relative overflow-hidden rounded-3xl border border-border/60 bg-background px-6 py-16 text-center text-foreground sm:px-16">
          <div
            aria-hidden
            className="bg-grid mask-radial-fade absolute inset-0 opacity-60"
          />
          <div
            aria-hidden
            className="animate-float-drift absolute -left-16 -top-24 h-64 w-64 rounded-full bg-brand/20 blur-3xl"
          />
          <div
            aria-hidden
            className="animate-float-drift absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-signal/15 blur-3xl [animation-delay:-7s]"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Make your next purchase your{" "}
              <span className="text-gradient-brand">smartest one</span>.
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Join BuyWise and let AI do the research. Free to start, no credit
              card required.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic>
                <ButtonLink
                  size="lg"
                  className="h-11 gap-1.5 px-6"
                  href="/register"
                >
                  Get started free <ArrowRight className="size-4" />
                </ButtonLink>
              </Magnetic>
              <ButtonLink
                size="lg"
                variant="ghost"
                className="h-11 px-6"
                href="/login"
              >
                Sign in
              </ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
