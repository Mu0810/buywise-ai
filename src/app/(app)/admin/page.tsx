import type { Metadata } from "next";

import { formatRelativeTime } from "@/lib/utils";
import { getAdminService } from "@/server/container";

export const metadata: Metadata = { title: "Admin — Overview" };

export default async function AdminOverviewPage() {
  const { counts, topSearches, planBreakdown, recentUsers } =
    await getAdminService().getOverview();

  const stats = [
    { label: "Users", value: counts.users },
    { label: "Products", value: counts.products },
    { label: "Offers", value: counts.offers },
    { label: "Stores", value: counts.stores },
    { label: "Searches", value: counts.searches },
    { label: "Conversations", value: counts.conversations },
    { label: "AI messages", value: counts.messages },
    { label: "Price alerts", value: counts.alerts },
  ];
  const totalUsers = counts.users || 1;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border/60 bg-card p-5"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold">
              {stat.value.toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border/60 bg-card p-5">
          <h2 className="text-sm font-medium">Top searches</h2>
          {topSearches.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">No searches yet.</p>
          ) : (
            <ul className="mt-3 flex flex-col gap-2">
              {topSearches.map((s) => (
                <li
                  key={s.query}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <span className="truncate text-muted-foreground">
                    {s.query}
                  </span>
                  <span className="font-medium tabular-nums">{s.count}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-border/60 bg-card p-5">
          <h2 className="text-sm font-medium">Subscriptions</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {(["FREE", "PREMIUM", "FAMILY"] as const).map((plan) => {
              const count = planBreakdown[plan] ?? 0;
              const pct = Math.round((count / totalUsers) * 100);
              return (
                <li key={plan} className="flex flex-col gap-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{plan}</span>
                    <span className="font-medium tabular-nums">{count}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-brand"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium">Recent signups</h2>
        <div className="overflow-x-auto rounded-2xl border border-border/60">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/40 text-left">
                <th className="p-3 font-medium">User</th>
                <th className="p-3 font-medium">Role</th>
                <th className="p-3 font-medium">Plan</th>
                <th className="p-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.length === 0 ? (
                <tr>
                  <td className="p-3 text-muted-foreground" colSpan={4}>
                    No users yet.
                  </td>
                </tr>
              ) : (
                recentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-border/40 last:border-0"
                  >
                    <td className="p-3">
                      <p className="font-medium">{user.name ?? "—"}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </td>
                    <td className="p-3 text-muted-foreground">{user.role}</td>
                    <td className="p-3 text-muted-foreground">{user.plan}</td>
                    <td className="p-3 text-muted-foreground">
                      {formatRelativeTime(user.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
