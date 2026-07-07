"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BadgeCheck, Check, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { CountUp, EASE_OUT_EXPO, ScoreRing } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";

/** Stores the demo "scans", in scan order. */
const STORES = ["Amazon", "Flipkart", "Croma", "Reliance Digital", "Vijay Sales"];

interface Scenario {
  query: string;
  product: string;
  score: number;
  price: number;
  wasPrice: number;
  store: string;
  reviews: string;
  note: string;
}

const SCENARIOS: Scenario[] = [
  {
    query: "Best coding laptop under ₹70,000",
    product: "Lenovo ThinkPad E14 Gen 6",
    score: 87,
    price: 64990,
    wasPrice: 73990,
    store: "Flipkart",
    reviews: "4.5★ · 8.2k reviews read",
    note: "₹9,000 below its 90-day average",
  },
  {
    query: "Noise-cancelling earbuds for travel",
    product: "Sony WF-1000XM5",
    score: 91,
    price: 19989,
    wasPrice: 24990,
    store: "Amazon",
    reviews: "4.6★ · 12.4k reviews read",
    note: "Best-in-class ANC, 24h battery",
  },
  {
    query: "Best phone under ₹25,000",
    product: "Redmi Note 14 Pro",
    score: 84,
    price: 23999,
    wasPrice: 27999,
    store: "Croma",
    reviews: "4.4★ · 9.8k reviews read",
    note: "Top value pick · 120Hz AMOLED",
  },
];

type Phase = "typing" | "scanning" | "verdict";

/**
 * The signature hero moment: a simulated BuyWise research run. A question
 * types itself, stores are scanned one by one (signal teal = working), and
 * the verdict card assembles in gold — the product, happening on screen.
 */
export function ResearchConsole() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [text, setText] = useState("");
  const [scanCount, setScanCount] = useState(0);

  const scenario = SCENARIOS[scenarioIndex % SCENARIOS.length];

  // Phase 1 — the question types itself.
  useEffect(() => {
    if (reduceMotion || phase !== "typing") return;
    if (text === scenario.query) {
      const timer = setTimeout(() => {
        setScanCount(0);
        setPhase("scanning");
      }, 550);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(
      () => setText(scenario.query.slice(0, text.length + 1)),
      42,
    );
    return () => clearTimeout(timer);
  }, [phase, text, scenario.query, reduceMotion]);

  // Phase 2 — stores light up as they are scanned.
  useEffect(() => {
    if (reduceMotion || phase !== "scanning") return;
    if (scanCount >= STORES.length) {
      const timer = setTimeout(() => setPhase("verdict"), 500);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setScanCount((count) => count + 1), 340);
    return () => clearTimeout(timer);
  }, [phase, scanCount, reduceMotion]);

  // Phase 3 — hold the verdict, then run the next question.
  useEffect(() => {
    if (reduceMotion || phase !== "verdict") return;
    const timer = setTimeout(() => {
      setText("");
      setPhase("typing");
      setScenarioIndex((index) => (index + 1) % SCENARIOS.length);
    }, 4600);
    return () => clearTimeout(timer);
  }, [phase, reduceMotion]);

  // Reduced motion: show the finished state of the first scenario, no loop.
  const staticMode = Boolean(reduceMotion);
  const shownText = staticMode ? scenario.query : text;
  const shownPhase: Phase = staticMode ? "verdict" : phase;
  const shownScans = staticMode ? STORES.length : scanCount;

  return (
    <div className="relative w-full max-w-2xl">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] bg-brand/10 opacity-60 blur-2xl"
      />
      <div className="relative flex flex-col gap-4 rounded-2xl border border-border/70 bg-card/80 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-5">
        {/* Query line */}
        <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/60 p-2 pl-4">
          <Search className="size-5 shrink-0 text-muted-foreground" />
          <div className="flex h-10 flex-1 items-center overflow-hidden text-left">
            <span className="truncate text-sm text-foreground sm:text-base">
              {shownText}
            </span>
            {!staticMode && (
              <span className="ml-0.5 inline-block h-5 w-px animate-pulse bg-brand" />
            )}
          </div>
          <Button
            size="lg"
            className="h-10 gap-1.5 px-4"
            onClick={() => router.push("/register")}
          >
            Ask BuyWise <ArrowRight className="size-4" />
          </Button>
        </div>

        {/* Store scan rail */}
        <div className="flex flex-wrap items-center gap-1.5">
          {STORES.map((store, index) => {
            const isDone =
              shownPhase === "verdict" ||
              (shownPhase === "scanning" && index < shownScans);
            const isActive = shownPhase === "scanning" && index === shownScans;
            return (
              <span
                key={store}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide transition-colors duration-300",
                  isDone && "border-success/40 bg-success/10 text-success",
                  isActive &&
                    "animate-pulse-ring border-signal/50 bg-signal/10 text-signal",
                  !isDone && !isActive && "border-border/60 text-muted-foreground/60",
                )}
              >
                {isDone && <Check className="size-2.5" strokeWidth={3} />}
                {store}
              </span>
            );
          })}
        </div>

        {/* Swap area: status line while working, verdict card when done */}
        <div className="relative min-h-[8.5rem] sm:min-h-[7.5rem]">
          <AnimatePresence mode="wait" initial={false}>
            {shownPhase !== "verdict" ? (
              <motion.div
                key="status"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
                transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                className="flex h-full min-h-[inherit] flex-col items-start justify-center gap-2 rounded-xl border border-dashed border-border/60 px-4"
              >
                <p className="font-mono text-xs text-shimmer">
                  {shownPhase === "typing"
                    ? "Ready to research the whole market…"
                    : shownScans < STORES.length
                      ? `Scanning ${STORES[shownScans]}…`
                      : "Reading reviews · comparing 14 offers…"}
                </p>
                <p className="text-xs text-muted-foreground/70">
                  Specs, prices, coupons and thousands of reviews — decoded
                  into one verdict.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={`verdict-${scenarioIndex}`}
                initial={
                  staticMode
                    ? false
                    : { opacity: 0, y: 14, scale: 0.98, filter: "blur(4px)" }
                }
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                className="relative flex h-full min-h-[inherit] items-center gap-4 rounded-xl border border-brand/30 bg-brand/[0.06] px-4 py-3 text-left"
              >
                <ScoreRing score={scenario.score} size={60} delay={0.15} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {scenario.product}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                    {scenario.reviews}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="font-mono text-xl font-semibold tabular-nums">
                      <CountUp
                        value={scenario.price}
                        format={formatPrice}
                        duration={1}
                        delay={0.2}
                      />
                    </span>
                    <del className="font-mono text-xs text-muted-foreground/70">
                      {formatPrice(scenario.wasPrice)}
                    </del>
                    <span className="text-xs font-medium text-success">
                      {scenario.note}
                    </span>
                  </div>
                </div>
                <motion.span
                  initial={
                    staticMode ? false : { opacity: 0, scale: 0.55, rotate: -10 }
                  }
                  animate={{ opacity: 1, scale: 1, rotate: -3 }}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 16,
                    delay: staticMode ? 0 : 0.75,
                  }}
                  className="absolute -top-2.5 right-3 inline-flex items-center gap-1 rounded-full border border-brand/50 bg-brand px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-brand-foreground shadow-lg"
                >
                  <BadgeCheck className="size-3" />
                  Best value · {scenario.store}
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
