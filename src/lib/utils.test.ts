import { describe, expect, it } from "vitest";

import {
  calcDiscountPercent,
  clamp,
  formatCompactNumber,
  formatPercent,
  formatPrice,
  getInitials,
  slugify,
  truncate,
} from "@/lib/utils";

describe("formatPrice", () => {
  it("formats whole rupees with the ₹ symbol and grouping", () => {
    const result = formatPrice(69990);
    expect(result).toContain("₹");
    expect(result).toContain("69,990");
  });
  it("omits paise by default", () => {
    expect(formatPrice(1000)).not.toContain(".");
  });
  it("includes paise when requested", () => {
    expect(formatPrice(1000, { withPaise: true })).toContain(".00");
  });
});

describe("formatCompactNumber", () => {
  it("compacts thousands to one fraction digit", () => {
    expect(formatCompactNumber(12500)).toContain("12.5");
  });
});

describe("formatPercent", () => {
  it("treats values above 1 as already-scaled percentages", () => {
    expect(formatPercent(25)).toContain("25");
  });
  it("treats values at or below 1 as ratios", () => {
    expect(formatPercent(0.25)).toContain("25");
  });
});

describe("calcDiscountPercent", () => {
  it("computes the rounded discount", () => {
    expect(calcDiscountPercent(100000, 75000)).toBe(25);
  });
  it("returns 0 when price is not below mrp", () => {
    expect(calcDiscountPercent(1000, 1000)).toBe(0);
    expect(calcDiscountPercent(1000, 1200)).toBe(0);
  });
  it("returns 0 for a non-positive mrp", () => {
    expect(calcDiscountPercent(0, 500)).toBe(0);
  });
});

describe("slugify", () => {
  it("lowercases, strips punctuation, and hyphenates", () => {
    expect(slugify("Best Coding Laptop!")).toBe("best-coding-laptop");
  });
  it("collapses separators and trims edges", () => {
    expect(slugify("  Hello   World--Again  ")).toBe("hello-world-again");
  });
});

describe("getInitials", () => {
  it("uses first and last name initials", () => {
    expect(getInitials("Ada Lovelace")).toBe("AL");
  });
  it("derives initials from the local part of an email", () => {
    expect(getInitials("ada@example.com")).toBe("AD");
  });
  it("falls back to a placeholder for empty input", () => {
    expect(getInitials("")).toBe("?");
  });
});

describe("clamp", () => {
  it("clamps above the maximum", () => {
    expect(clamp(150, 0, 100)).toBe(100);
  });
  it("clamps below the minimum", () => {
    expect(clamp(-5, 0, 100)).toBe(0);
  });
  it("passes through values in range", () => {
    expect(clamp(42, 0, 100)).toBe(42);
  });
});

describe("truncate", () => {
  it("adds an ellipsis when text exceeds the limit", () => {
    expect(truncate("hello world", 5)).toBe("hello\u2026");
  });
  it("leaves short text untouched", () => {
    expect(truncate("hi", 5)).toBe("hi");
  });
});
