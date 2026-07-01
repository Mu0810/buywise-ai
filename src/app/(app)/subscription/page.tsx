import type { Metadata } from "next";

import { requireUser } from "@/features/auth/lib/current-user";
import { BillingView } from "@/features/billing/components/billing-view";
import { isBillingConfigured } from "@/features/billing/lib/stripe";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Subscription" };

export default async function SubscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;
  const subscription = await prisma.subscription.findUnique({
    where: { userId: user.id },
  });

  const checkoutStatus =
    params.status === "success"
      ? "success"
      : params.status === "cancelled"
        ? "cancelled"
        : null;

  const renewalDate = subscription?.currentPeriodEnd
    ? subscription.currentPeriodEnd.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <BillingView
      currentPlan={user.plan}
      isConfigured={isBillingConfigured}
      renewalDate={renewalDate}
      checkoutStatus={checkoutStatus}
    />
  );
}
