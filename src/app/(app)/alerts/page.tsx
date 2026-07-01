import type { Metadata } from "next";

import { AlertsView } from "@/features/alerts/components/alerts-view";

export const metadata: Metadata = { title: "Price Alerts" };

export default function AlertsPage() {
  return <AlertsView />;
}
