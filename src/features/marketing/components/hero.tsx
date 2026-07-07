import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";

import { Marquee } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button-link";

import { providerNames } from "../data/providers";
import { ResearchConsole } from "./research-console";

/** Inline stagger index consumed by the `animate-enter` utility. */
const stagger = (index: number) => ({ "--stagger": index }) as CSSProperties;

const HEADLINE_TOP = ["Stop", "opening", "ten", "tabs."];
const HEADLINE_BOTTOM = ["Just", "ask", "BuyWise."];

/**
 * The hero lives permanently in ink — the analyst's desk — regardless of
 * theme. Entrance choreography is pure CSS (`animate-enter` + `--stagger`),
 * so the section stays a server component; only the console ships JS.
 */
export function Hero() {
  let wordIndex = 0;

  return (
    <section id="hero" className="dark relative overflow-hidden bg-background text-foreground">
      <div
        aria-hidden
        className="bg-grid mask-radial-fade absolute inset-0 -z-10"
      />
      <div
        aria-hidden
        className="animate-float-drift absolute left-[8%] top-[-6rem] -z-10 h-[24rem] w-[24rem] rounded-full bg-brand/15 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-float-drift absolute right-[6%] top-[4rem] -z-10 h-[20rem] w-[20rem] rounded-full bg-signal/12 blur-3xl [animation-delay:-9s]"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pb-16 pt-32 text-center sm:px-6 sm:pt-40 lg:px-8">
        <p
          className="animate-enter inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
          style={stagger(0)}
        >
          <span aria-hidden className="size-1.5 rounded-full bg-brand" />
          AI shopping intelligence
          <span className="rounded-full bg-brand/15 px-1.5 py-0.5 text-[10px] font-semibold tracking-normal text-brand">
            New
          </span>
        </p>

        <h1 className="mt-6 max-w-4xl text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
          <span className="block">
            {HEADLINE_TOP.map((word) => (
              <span
                key={word}
                className="animate-enter mr-[0.28em] inline-block last:mr-0"
                style={stagger(1 + wordIndex++)}
              >
                {word}
              </span>
            ))}
          </span>
          <span className="block">
            {HEADLINE_BOTTOM.map((word) => (
              <span
                key={word}
                className="animate-enter mr-[0.28em] inline-block last:mr-0"
                style={stagger(1 + wordIndex++)}
              >
                {word === "BuyWise." ? (
                  <>
                    <span className="text-gradient-brand">BuyWise</span>.
                  </>
                ) : (
                  word
                )}
              </span>
            ))}
          </span>
        </h1>

        <p
          className="animate-enter mt-6 max-w-2xl text-pretty text-lg text-muted-foreground"
          style={stagger(9)}
        >
          Describe what you need. BuyWise researches every major store,
          compares specs and prices, decodes thousands of reviews — and hands
          you a verdict you can trust.
        </p>

        <div
          className="animate-enter mt-10 flex w-full justify-center"
          style={stagger(11)}
        >
          <ResearchConsole />
        </div>

        <div
          className="animate-enter mt-9 flex flex-col items-center gap-3 sm:flex-row"
          style={stagger(13)}
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
        </div>
        <p
          className="animate-enter mt-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground/80"
          style={stagger(14)}
        >
          Free to start · No credit card required
        </p>

        <div className="animate-enter mt-16 w-full" style={stagger(15)}>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Searches across your favourite stores
          </p>
          <Marquee className="mt-5" duration={34}>
            {providerNames.map((name) => (
              <span
                key={name}
                className="mx-5 inline-flex items-center gap-5 text-sm font-medium text-muted-foreground/70"
              >
                {name}
                <span aria-hidden className="size-1 rounded-full bg-brand/50" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
