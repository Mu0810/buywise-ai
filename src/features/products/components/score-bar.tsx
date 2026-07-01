import { cn } from "@/lib/utils";

function toneFor(score: number): string {
  if (score >= 80) return "bg-success";
  if (score >= 60) return "bg-brand";
  if (score >= 40) return "bg-amber-500";
  return "bg-destructive";
}

export function ScoreBar({
  label,
  score,
  className,
}: {
  label: string;
  score: number;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, score));
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium tabular-nums">{clamped}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full", toneFor(clamped))}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
