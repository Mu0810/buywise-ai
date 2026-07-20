import { ArrowRight, Sparkles } from "lucide-react";

import { Magnetic } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button-link";

import { Reveal } from "./reveal";

/**
 * Closing band: the page ends where it began — in ink, with a gold verdict.
 */
export function CtaBand() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal y={34} scale={0.97}>
        <div className="animated-border dark border-border/60 bg-background text-foreground relative isolate overflow-hidden rounded-3xl border px-6 py-16 text-center shadow-2xl shadow-black/15 sm:px-16 sm:py-20">
          <div
            aria-hidden
            className="bg-grid animate-grid-drift mask-radial-fade absolute inset-0 -z-10 opacity-60"
          />
          <div
            aria-hidden
            className="hero-aurora animate-aurora absolute inset-x-[5%] -top-52 -z-10 h-[34rem] opacity-60 blur-3xl"
          />
          <div
            aria-hidden
            className="animate-float-drift bg-brand/20 absolute -top-24 -left-16 -z-10 h-64 w-64 rounded-full blur-3xl"
          />
          <div
            aria-hidden
            className="animate-float-drift bg-signal/15 absolute -right-16 -bottom-24 -z-10 h-64 w-64 rounded-full blur-3xl [animation-delay:-7s]"
          />
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="animate-orbit border-brand/10 relative h-[30rem] w-[30rem] rounded-full border sm:h-[42rem] sm:w-[42rem]">
              <span className="bg-brand absolute top-0 left-1/2 size-2 -translate-x-1/2 rounded-full shadow-[0_0_18px_var(--brand)]" />
            </div>
          </div>
          <span
            aria-hidden
            className="animate-twinkle bg-brand absolute top-[24%] left-[12%] size-1.5 rounded-full"
          />
          <span
            aria-hidden
            className="animate-twinkle bg-signal absolute top-[30%] right-[14%] size-1 rounded-full [animation-delay:-1.8s]"
          />
          <span
            aria-hidden
            className="animate-twinkle bg-foreground/70 absolute bottom-[22%] left-[22%] size-1 rounded-full [animation-delay:-3.2s]"
          />

          <div className="relative mx-auto max-w-2xl">
            <p className="border-brand/20 bg-brand/[0.08] text-brand mx-auto mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase backdrop-blur-md">
              <Sparkles className="animate-twinkle size-3" />
              Your next verdict is waiting
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              Make your next purchase your{" "}
              <span className="text-gradient-brand">smartest one</span>.
            </h2>
            <p className="text-muted-foreground mt-4 text-lg text-pretty">
              Join BuyWise and let AI do the research. Free to start, no credit
              card required.
            </p>
            <div className="text-muted-foreground mt-6 flex flex-wrap items-center justify-center gap-2 font-mono text-[10px] tracking-wider uppercase">
              <span className="border-border/60 bg-card/40 rounded-full border px-3 py-1.5 backdrop-blur-sm">
                10+ stores
              </span>
              <span className="border-border/60 bg-card/40 rounded-full border px-3 py-1.5 backdrop-blur-sm">
                Thousands of reviews
              </span>
              <span className="border-border/60 bg-card/40 rounded-full border px-3 py-1.5 backdrop-blur-sm">
                One clear verdict
              </span>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic>
                <ButtonLink
                  size="lg"
                  className="group shadow-brand/20 h-11 gap-1.5 px-6 shadow-lg"
                  href="/register"
                >
                  Get started free
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
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
