import {
  Check,
  ShieldAlert,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  UserCheck,
  UserX,
  X,
} from "lucide-react";

import type { ProductDetail } from "@/features/products/types";
import { cn } from "@/lib/utils";

type Analysis = NonNullable<ProductDetail["reviewAnalysis"]>;

function fakeLabel(score: number): { label: string; tone: string } {
  if (score < 20) return { label: "Very few suspicious reviews", tone: "text-success" };
  if (score < 45) return { label: "Some suspicious reviews", tone: "text-amber-500" };
  return { label: "Many suspicious reviews", tone: "text-destructive" };
}

function List({
  items,
  tone,
  Icon,
}: {
  items: string[];
  tone: string;
  Icon: typeof Check;
}) {
  return (
    <ul className="flex flex-col gap-2 text-sm">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <Icon className={cn("mt-0.5 size-4 shrink-0", tone)} />
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ReviewAnalysis({ analysis }: { analysis: Analysis }) {
  const sentiment = analysis.sentiment as {
    positive?: number;
    neutral?: number;
    negative?: number;
  } | null;
  const fake = fakeLabel(analysis.fakeReviewScore);

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-2xl border border-brand/30 bg-brand/5 p-5">
        <div className="flex items-center gap-2 text-sm font-medium text-brand">
          <Sparkles className="size-4" /> AI verdict
        </div>
        <p className="mt-2 text-lg font-medium">{analysis.verdict}</p>
        <p className="mt-2 text-sm text-muted-foreground">{analysis.summary}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          Based on {analysis.analyzedCount.toLocaleString("en-IN")} reviews
          analysed.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-sm font-medium">
            <ThumbsUp className="size-4 text-success" /> What people love
          </h3>
          <List items={analysis.topPraises} tone="text-success" Icon={Check} />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-sm font-medium">
            <ThumbsDown className="size-4 text-destructive" /> Common complaints
          </h3>
          <List items={analysis.topComplaints} tone="text-destructive" Icon={X} />
        </div>
      </div>

      {sentiment && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">Sentiment breakdown</h3>
          <div className="flex h-3 overflow-hidden rounded-full">
            <div
              className="bg-success"
              style={{ width: `${sentiment.positive ?? 0}%` }}
            />
            <div
              className="bg-muted-foreground/30"
              style={{ width: `${sentiment.neutral ?? 0}%` }}
            />
            <div
              className="bg-destructive"
              style={{ width: `${sentiment.negative ?? 0}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span>Positive {sentiment.positive ?? 0}%</span>
            <span>Neutral {sentiment.neutral ?? 0}%</span>
            <span>Negative {sentiment.negative ?? 0}%</span>
          </div>
        </div>
      )}

      <div className="flex items-start gap-3 rounded-2xl border border-border/60 p-4">
        <ShieldAlert className={cn("mt-0.5 size-5 shrink-0", fake.tone)} />
        <div>
          <p className="text-sm font-medium">
            Fake-review estimate:{" "}
            <span className={fake.tone}>{fake.label}</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            We estimate ~{analysis.fakeReviewScore}% of reviews may be
            unreliable (confidence{" "}
            {Math.round(analysis.fakeReviewConfidence * 100)}%). This is a
            heuristic estimate, not a definitive verdict.
          </p>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-sm font-medium">
            <UserCheck className="size-4 text-success" /> Who should buy
          </h3>
          <List items={analysis.whoShouldBuy} tone="text-success" Icon={Check} />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-sm font-medium">
            <UserX className="size-4 text-destructive" /> Who should avoid
          </h3>
          <List items={analysis.whoShouldAvoid} tone="text-destructive" Icon={X} />
        </div>
      </div>

      {analysis.longTermInsights && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">Long-term ownership</h3>
          <p className="text-sm text-muted-foreground">
            {analysis.longTermInsights}
          </p>
        </div>
      )}
    </div>
  );
}
