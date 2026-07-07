import { Check } from "lucide-react";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import { Logo } from "@/components/shared/logo";

const highlights = [
  "Research across 11 major stores",
  "AI scores, review summaries & fake-review estimates",
  "Price history and instant drop alerts",
];

const stagger = (index: number) => ({ "--stagger": index }) as CSSProperties;

/**
 * Auth split view: the pitch panel lives in ink with gold accents (matching
 * the marketing hero); the form side stays quiet and theme-following.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="dark relative hidden flex-col justify-between overflow-hidden bg-background p-10 text-foreground lg:flex">
        <div
          aria-hidden
          className="bg-grid mask-radial-fade absolute inset-0 opacity-70"
        />
        <div
          aria-hidden
          className="animate-float-drift absolute -right-20 top-10 h-72 w-72 rounded-full bg-brand/15 blur-3xl"
        />
        <div
          aria-hidden
          className="animate-float-drift absolute -left-16 bottom-20 h-64 w-64 rounded-full bg-signal/12 blur-3xl [animation-delay:-8s]"
        />
        <Link href="/" className="relative">
          <Logo />
        </Link>
        <div className="animate-enter relative max-w-md" style={stagger(2)}>
          <blockquote className="font-display text-2xl font-medium leading-snug">
            &ldquo;It feels like ChatGPT met Google Shopping. I just ask, and
            trust the <span className="text-gradient-brand">verdict</span>.&rdquo;
          </blockquote>
          <p className="mt-3 text-sm text-muted-foreground">
            &mdash; Ananya, founder in Chennai
          </p>
        </div>
        <ul className="relative flex flex-col gap-3 text-sm text-foreground/90">
          {highlights.map((item, index) => (
            <li
              key={item}
              className="animate-enter flex items-center gap-2"
              style={stagger(4 + index)}
            >
              <Check className="size-4 shrink-0 text-brand" strokeWidth={2.5} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <main id="main" className="flex items-center justify-center p-6 sm:p-10">
        <div className="animate-enter w-full max-w-sm" style={stagger(1)}>
          <div className="mb-8 lg:hidden">
            <Logo href="/" />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
