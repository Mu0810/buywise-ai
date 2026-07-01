import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";

import { Reveal } from "./reveal";

export function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-indigo-600 px-6 py-16 text-center sm:px-16">
          <div
            aria-hidden
            className="bg-grid absolute inset-0 opacity-20 mix-blend-overlay"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Make your next purchase your smartest one.
            </h2>
            <p className="mt-4 text-pretty text-lg text-white/80">
              Join BuyWise and let AI do the research. Free to start, no credit
              card required.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink
                size="lg"
                variant="secondary"
                className="h-11 gap-1.5 px-6"
                href="/register"
              >
                Get started free <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink
                size="lg"
                variant="ghost"
                className="h-11 px-6 text-white hover:bg-white/10 hover:text-white"
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
