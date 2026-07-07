import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

/**
 * Section header: a mono ledger-label eyebrow with a gold tick, then the
 * display-face headline. The eyebrow is data, the headline is voice.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
          <span aria-hidden className="size-1.5 rounded-full bg-brand" />
          {eyebrow}
        </span>
      )}
      <h2 className="max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
