import { describe, expect, it } from "vitest";

import {
  detectCategory,
  extractBudget,
  extractPriorities,
} from "@/features/search/lib/query-parser";

describe("detectCategory", () => {
  it("detects laptops", () => {
    expect(detectCategory("best coding laptop under 70000")).toBe("laptops");
  });
  it("detects smartphones", () => {
    expect(detectCategory("best phone under 25k")).toBe("smartphones");
  });
  it("detects audio", () => {
    expect(detectCategory("noise cancelling earbuds for travel")).toBe("audio");
  });
  it("detects cameras", () => {
    expect(detectCategory("mirrorless camera for beginners")).toBe("cameras");
  });
  it("returns undefined for unknown", () => {
    expect(detectCategory("hello there friend")).toBeUndefined();
  });
});

describe("extractBudget", () => {
  it("parses 'under 70000'", () => {
    expect(extractBudget("coding laptop under 70000")).toBe(70000);
  });
  it("parses '25k'", () => {
    expect(extractBudget("phone under 25k")).toBe(25000);
  });
  it("parses lakh", () => {
    expect(extractBudget("laptop under 1.5 lakh")).toBe(150000);
  });
  it("parses a rupee amount with commas", () => {
    expect(extractBudget("under ₹45,000")).toBe(45000);
  });
  it("returns undefined when no budget", () => {
    expect(extractBudget("best laptop for coding")).toBeUndefined();
  });
});

describe("extractPriorities", () => {
  it("detects gaming and battery", () => {
    const priorities = extractPriorities("gaming laptop with long battery");
    expect(priorities).toContain("gaming");
    expect(priorities).toContain("battery");
  });
  it("returns empty when none present", () => {
    expect(extractPriorities("a nice phone")).toEqual([]);
  });
});
