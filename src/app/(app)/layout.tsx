import type { ReactNode } from "react";

import { AppSidebar } from "@/components/app/app-sidebar";
import { AppTopbar } from "@/components/app/app-topbar";
import { CompareTray } from "@/features/compare/components/compare-tray";
import { getAuthUser } from "@/features/auth/lib/current-user";

// App pages are auth-aware (read session cookies), so always render dynamically.
export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await getAuthUser();

  return (
    <div className="flex min-h-svh">
      <AppSidebar user={user} className="hidden lg:flex" />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar user={user} />
        <main id="main" className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
      <CompareTray />
    </div>
  );
}
