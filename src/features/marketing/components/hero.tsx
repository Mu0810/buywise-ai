import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";

import { providerNames } from "../data/providers";
import { AnimatedSearch } from "./animated-search";
import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div
        aria-hidden
        className="bg-grid mask-radial-fade absolute inset-0 -z-10"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-10%] -z-10 h-[420px] w-[820px] max-w-[95vw] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-indigo-500/20 blur-3xl"
      />
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pb-20 pt-32 text-center sm:px-6 sm:pt-40 lg:px-8">
        <Reveal>
          <Link
            href="#features"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          >
            <Sparkles className="size-3.5 text-brand" />
            AI-powered shopping intelligence
            <span className="rounded-full bg-brand/10 px-1.5 py-0.5 text-[10px] font-semibold text-brand">
              New
            </span>
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            Stop opening ten tabs. Just ask{" "}
            <span className="text-gradient-brand">BuyWise AI</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            Describe what you need and BuyWise researches products across every
            major store, compares specs and prices, decodes thousands of
            reviews, and recommends the best value for you.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-10 flex w-full justify-center">
          <AnimatedSearch />
        </Reveal>
        <Reveal
          delay={0.2}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
        >
          <ButtonLink size="lg" className="h-11 gap-1.5 px-6" href="/register">
            Start free <ArrowRight className="size-4" />
          </ButtonLink>
          <ButtonLink
            size="lg"
            variant="ghost"
            className="h-11 px-6"
            href="#how-it-works"
          >
            See how it works
          </ButtonLink>
        </Reveal>
        <p className="mt-4 text-xs text-muted-foreground">
          Free to start &middot; No credit card required
        </p>
        <Reveal delay={0.25} className="mt-16 w-full">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Searches across your favourite stores
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {providerNames.map((name) => (
              <span
                key={name}
                className="text-sm font-medium text-muted-foreground/70"
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
