import type { Metadata } from "next";

import { CompareView } from "@/features/compare/components/compare-view";

export const metadata: Metadata = { title: "Compare" };

export default function ComparePage() {
  return <CompareView />;
}
