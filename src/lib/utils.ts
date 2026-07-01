import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNowStrict } from "date-fns";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names with conflict resolution.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const inrFormatterWithPaise = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Format a number as Indian Rupees, e.g. 69990 -> "₹69,990".
 */
export function formatPrice(
  amount: number,
  options: { withPaise?: boolean } = {},
): string {
  const formatter = options.withPaise ? inrFormatterWithPaise : inrFormatter;
  return formatter.format(amount);
}

/**
 * Compact number formatting, e.g. 12500 -> "12.5K", 1200000 -> "1.2M".
 */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

/**
 * Format a 0-100 or 0-1 value as a percentage string.
 */
export function formatPercent(value: number, fractionDigits = 0): string {
  const normalized = value > 1 ? value / 100 : value;
  return new Intl.NumberFormat("en-IN", {
    style: "percent",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(normalized);
}

/**
 * Human-friendly relative time, e.g. "3 days ago".
 */
export function formatRelativeTime(date: Date | string | number): string {
  const value = date instanceof Date ? date : new Date(date);
  return `${formatDistanceToNowStrict(value)} ago`;
}

/**
 * URL-safe slug from arbitrary text.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Build an absolute URL from a path using the configured app URL.
 */
export function absoluteUrl(path: string): string {
  const base =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
    "http://localhost:3000";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Truncate text to a maximum length with an ellipsis.
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return `${text.slice(0, length).trimEnd()}\u2026`;
}

/**
 * Initials from a name or email, e.g. "Ada Lovelace" -> "AL".
 */
export function getInitials(nameOrEmail: string): string {
  const source = nameOrEmail.includes("@")
    ? nameOrEmail.split("@")[0] ?? nameOrEmail
    : nameOrEmail;
  const parts = source.split(/[\s._-]+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0]!}${parts[parts.length - 1]![0]!}`.toUpperCase();
}

/**
 * Clamp a number between a minimum and maximum.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Compute the percentage discount between an original and current price.
 */
export function calcDiscountPercent(mrp: number, price: number): number {
  if (mrp <= 0 || price >= mrp) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

/**
 * Promise-based delay.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
