import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Logo } from "@/components/shared/logo";

const highlights = [
  "Research across 11 major stores",
  "AI scores, review summaries & fake-review estimates",
  "Price history and instant drop alerts",
];

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-600 via-fuchsia-600 to-indigo-700 p-10 text-white lg:flex">
        <div
          aria-hidden
          className="bg-grid absolute inset-0 opacity-20 mix-blend-overlay"
        />
        <Link href="/" className="relative flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
            <Sparkles className="size-4" strokeWidth={2.5} />
          </span>
          <span className="font-semibold tracking-tight">BuyWise AI</span>
        </Link>
        <div className="relative max-w-md">
          <blockquote className="text-2xl font-medium leading-snug">
            &ldquo;It feels like ChatGPT met Google Shopping. I just ask, and
            trust the verdict.&rdquo;
          </blockquote>
          <p className="mt-3 text-sm text-white/70">
            &mdash; Ananya, founder in Chennai
          </p>
        </div>
        <ul className="relative flex flex-col gap-3 text-sm text-white/90">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="size-4 shrink-0" strokeWidth={2.5} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <main
        id="main"
        className="flex items-center justify-center p-6 sm:p-10"
      >
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo href="/" />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
