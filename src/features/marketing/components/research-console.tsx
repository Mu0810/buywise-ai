"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, BadgeCheck, Check, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import type { PointerEvent } from "react";
import { useEffect, useState } from "react";

import { CountUp, EASE_OUT_EXPO, ScoreRing } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";

/** Stores the demo "scans", in scan order. */
const STORES = [
  "Amazon",
  "Flipkart",
  "Croma",
  "Reliance Digital",
  "Vijay Sales",
];

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
 * types itself, stores are scanned one by one, and the verdict assembles in
 * gold. Mouse users get a restrained perspective response; reduced-motion
 * visitors see the completed first result without a loop.
 */
export function ResearchConsole() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [text, setText] = useState("");
  const [scanCount, setScanCount] = useState(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [3.5, -3.5]), {
    stiffness: 180,
    damping: 22,
    mass: 0.45,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-3.5, 3.5]), {
    stiffness: 180,
    damping: 22,
    mass: 0.45,
  });

  const scenario = SCENARIOS[scenarioIndex % SCENARIOS.length];

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

  useEffect(() => {
    if (reduceMotion || phase !== "scanning") return;
    if (scanCount >= STORES.length) {
      const timer = setTimeout(() => setPhase("verdict"), 500);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setScanCount((count) => count + 1), 340);
    return () => clearTimeout(timer);
  }, [phase, scanCount, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || phase !== "verdict") return;
    const timer = setTimeout(() => {
      setText("");
      setPhase("typing");
      setScenarioIndex((index) => (index + 1) % SCENARIOS.length);
    }, 4600);
    return () => clearTimeout(timer);
  }, [phase, reduceMotion]);

  const staticMode = Boolean(reduceMotion);
  const shownText = staticMode ? scenario.query : text;
  const shownPhase: Phase = staticMode ? "verdict" : phase;
  const shownScans = staticMode ? STORES.length : scanCount;
  const progress =
    shownPhase === "verdict"
      ? 100
      : shownPhase === "scanning"
        ? 20 + (shownScans / STORES.length) * 75
        : Math.min(18, (shownText.length / scenario.query.length) * 18);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function resetPerspective() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div className="relative w-full max-w-2xl [perspective:1200px]">
      <motion.div
        aria-hidden
        animate={
          staticMode
            ? { opacity: 0.45, scale: 1 }
            : shownPhase === "scanning"
              ? { opacity: [0.35, 0.75, 0.35], scale: [0.98, 1.03, 0.98] }
              : { opacity: 0.5, scale: 1 }
        }
        transition={
          shownPhase === "scanning"
            ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.5 }
        }
        className="bg-brand/20 absolute -inset-6 rounded-[2.5rem] blur-3xl"
      />

      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPerspective}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="animated-border border-border/70 bg-card/85 relative flex flex-col gap-4 rounded-2xl border p-4 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-5"
      >
        <div className="border-border/50 flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="bg-destructive/70 size-2 rounded-full" />
            <span className="bg-brand/70 size-2 rounded-full" />
            <span className="bg-success/70 size-2 rounded-full" />
          </div>
          <p className="text-muted-foreground font-mono text-[9px] font-semibold tracking-[0.2em] uppercase sm:text-[10px]">
            BuyWise research engine
          </p>
          <span className="text-signal inline-flex items-center gap-1.5 font-mono text-[9px] tracking-wider uppercase">
            <span className="animate-pulse-ring bg-signal size-1.5 rounded-full" />
            Live
          </span>
        </div>

        <div className="border-border/70 bg-background/60 flex items-center gap-3 rounded-xl border p-2 pl-4 shadow-inner shadow-black/5">
          <Search className="text-muted-foreground size-5 shrink-0" />
          <div className="flex h-10 flex-1 items-center overflow-hidden text-left">
            <span className="text-foreground truncate text-sm sm:text-base">
              {shownText}
            </span>
            {!staticMode && (
              <span className="bg-brand ml-0.5 inline-block h-5 w-px animate-pulse" />
            )}
          </div>
          <Button
            size="lg"
            aria-label="Ask BuyWise"
            className="group h-10 gap-1.5 px-3 sm:px-4"
            onClick={() => router.push("/register")}
          >
            <span className="hidden sm:inline">Ask BuyWise</span>
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="bg-muted h-0.5 overflow-hidden rounded-full">
          <motion.div
            className="from-signal via-brand to-success h-full rounded-full bg-gradient-to-r shadow-[0_0_12px_var(--brand)]"
            animate={{ width: `${progress}%` }}
            transition={
              staticMode
                ? { duration: 0 }
                : { duration: 0.45, ease: EASE_OUT_EXPO }
            }
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {STORES.map((store, index) => {
            const isDone =
              shownPhase === "verdict" ||
              (shownPhase === "scanning" && index < shownScans);
            const isActive = shownPhase === "scanning" && index === shownScans;
            return (
              <motion.span
                layout
                key={store}
                animate={
                  isActive
                    ? { y: [0, -2, 0], scale: [1, 1.04, 1] }
                    : { y: 0, scale: 1 }
                }
                transition={
                  isActive
                    ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.25 }
                }
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wide uppercase transition-colors duration-300",
                  isDone && "border-success/40 bg-success/10 text-success",
                  isActive &&
                    "animate-pulse-ring border-signal/50 bg-signal/10 text-signal",
                  !isDone &&
                    !isActive &&
                    "border-border/60 text-muted-foreground/60",
                )}
              >
                {isDone && <Check className="size-2.5" strokeWidth={3} />}
                {store}
              </motion.span>
            );
          })}
        </div>

        <div className="relative min-h-[8.5rem] sm:min-h-[7.5rem]">
          <AnimatePresence mode="wait" initial={false}>
            {shownPhase !== "verdict" ? (
              <motion.div
                key="status"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
                transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                className="border-border/60 relative flex h-full min-h-[inherit] flex-col items-start justify-center gap-2 overflow-hidden rounded-xl border border-dashed px-4"
              >
                {shownPhase === "scanning" && (
                  <span
                    aria-hidden
                    className="animate-scan-line via-signal absolute inset-x-0 h-px bg-gradient-to-r from-transparent to-transparent shadow-[0_0_12px_var(--signal)]"
                  />
                )}
                <p className="text-shimmer font-mono text-xs">
                  {shownPhase === "typing"
                    ? "Ready to research the whole market…"
                    : shownScans < STORES.length
                      ? `Scanning ${STORES[shownScans]}…`
                      : "Reading reviews · comparing 14 offers…"}
                </p>
                <p className="text-muted-foreground/70 text-xs">
                  Specs, prices, coupons and thousands of reviews — decoded into
                  one verdict.
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
                className="group border-brand/30 bg-brand/[0.06] relative flex h-full min-h-[inherit] items-center gap-4 overflow-hidden rounded-xl border px-4 py-3 text-left"
              >
                <span className="card-sheen" aria-hidden />
                <ScoreRing score={scenario.score} size={60} delay={0.15} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {scenario.product}
                  </p>
                  <p className="text-muted-foreground mt-0.5 font-mono text-[11px]">
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
                    <del className="text-muted-foreground/70 font-mono text-xs">
                      {formatPrice(scenario.wasPrice)}
                    </del>
                    <span className="text-success text-xs font-medium">
                      {scenario.note}
                    </span>
                  </div>
                </div>
                <motion.span
                  initial={
                    staticMode
                      ? false
                      : { opacity: 0, scale: 0.55, rotate: -10 }
                  }
                  animate={{ opacity: 1, scale: 1, rotate: -3 }}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 16,
                    delay: staticMode ? 0 : 0.75,
                  }}
                  className="border-brand/50 bg-brand text-brand-foreground absolute -top-2.5 right-3 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wide uppercase shadow-lg"
                >
                  <BadgeCheck className="size-3" />
                  Best value · {scenario.store}
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
