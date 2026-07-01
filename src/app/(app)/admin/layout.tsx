import type { ReactNode } from "react";

import { AdminNav } from "@/features/admin/components/admin-nav";
import { requireAdmin } from "@/features/auth/lib/current-user";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
        <p className="text-muted-foreground">
          Analytics and platform management.
        </p>
      </div>
      <AdminNav />
      {children}
    </div>
  );
}
