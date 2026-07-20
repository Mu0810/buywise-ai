import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import type { CSSProperties } from "react";

import { Magnetic, Marquee } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button-link";

import { providerNames } from "../data/providers";
import { ResearchConsole } from "./research-console";

/** Inline stagger index consumed by the `animate-enter` utility. */
const stagger = (index: number) => ({ "--stagger": index }) as CSSProperties;

const HEADLINE_TOP = ["Stop", "opening", "ten", "tabs."];
const HEADLINE_BOTTOM = ["Just", "ask", "BuyWise."];

/**
 * The hero lives permanently in ink — the analyst's desk — regardless of
 * theme. Its CSS-driven atmosphere keeps the initial render fast while the
 * research console supplies the interactive signature moment.
 */
export function Hero() {
  let wordIndex = 0;

  return (
    <section
      id="hero"
      className="dark bg-background text-foreground relative isolate min-h-[100svh] overflow-hidden"
    >
      <div
        aria-hidden
        className="bg-grid animate-grid-drift mask-radial-fade absolute inset-0 z-0"
      />
      <div
        aria-hidden
        className="hero-aurora animate-aurora absolute inset-x-[5%] -top-52 z-0 h-[38rem] opacity-70 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-float-drift bg-brand/15 absolute top-[-6rem] left-[5%] z-0 h-[25rem] w-[25rem] rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="animate-float-drift bg-signal/12 absolute top-[6rem] right-[3%] z-0 h-[22rem] w-[22rem] rounded-full blur-3xl [animation-delay:-9s]"
      />

      <div
        aria-hidden
        className="absolute top-[42%] left-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="animate-orbit border-brand/10 relative h-[38rem] w-[38rem] rounded-full border sm:h-[54rem] sm:w-[54rem]">
          <span className="bg-brand absolute top-0 left-1/2 size-2 -translate-x-1/2 rounded-full shadow-[0_0_18px_var(--brand)]" />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute top-[42%] left-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="animate-orbit-reverse border-signal/10 relative h-[26rem] w-[26rem] rounded-full border sm:h-[38rem] sm:w-[38rem]">
          <span className="bg-signal absolute right-[7%] bottom-[15%] size-1.5 rounded-full shadow-[0_0_16px_var(--signal)]" />
        </div>
      </div>
      <span
        aria-hidden
        className="animate-twinkle bg-brand absolute top-[28%] left-[12%] z-0 size-1 rounded-full"
      />
      <span
        aria-hidden
        className="animate-twinkle bg-signal absolute top-[22%] right-[15%] z-0 size-1.5 rounded-full [animation-delay:-1.6s]"
      />
      <span
        aria-hidden
        className="animate-twinkle bg-foreground/70 absolute top-[54%] right-[23%] z-0 size-1 rounded-full [animation-delay:-3s]"
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 pt-32 pb-24 text-center sm:px-6 sm:pt-40 lg:px-8">
        <p
          className="animate-enter border-brand/20 bg-brand/[0.06] text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] font-medium tracking-[0.18em] uppercase backdrop-blur-md"
          style={stagger(0)}
        >
          <Sparkles className="animate-twinkle text-brand size-3" />
          AI shopping intelligence
          <span className="bg-brand/15 text-brand rounded-full px-1.5 py-0.5 text-[10px] font-semibold tracking-normal">
            Live
          </span>
        </p>

        <h1 className="font-display mt-6 max-w-4xl text-5xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-7xl lg:text-[5.4rem]">
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
          className="animate-enter text-muted-foreground mt-6 max-w-2xl text-lg text-pretty"
          style={stagger(9)}
        >
          Describe what you need. BuyWise researches every major store, compares
          specs and prices, decodes thousands of reviews — and hands you a
          verdict you can trust.
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
          <Magnetic>
            <ButtonLink
              size="lg"
              className="group shadow-brand/15 h-11 gap-1.5 px-6 shadow-lg"
              href="/register"
            >
              Start free
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </ButtonLink>
          </Magnetic>
          <ButtonLink
            size="lg"
            variant="ghost"
            className="group h-11 px-6"
            href="#how-it-works"
          >
            See how it works
            <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" />
          </ButtonLink>
        </div>
        <p
          className="animate-enter text-muted-foreground/80 mt-4 font-mono text-[11px] tracking-wider uppercase"
          style={stagger(14)}
        >
          Free to start · No credit card required
        </p>

        <div className="animate-enter mt-16 w-full" style={stagger(15)}>
          <p className="text-muted-foreground font-mono text-[11px] font-medium tracking-[0.18em] uppercase">
            Searches across your favourite stores
          </p>
          <Marquee className="mt-5" duration={34}>
            {providerNames.map((name) => (
              <span
                key={name}
                className="text-muted-foreground/70 hover:text-foreground mx-5 inline-flex items-center gap-5 text-sm font-medium transition-colors"
              >
                {name}
                <span aria-hidden className="bg-brand/50 size-1 rounded-full" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
