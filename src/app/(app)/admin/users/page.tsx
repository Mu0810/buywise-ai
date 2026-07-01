import type { Metadata } from "next";

import { formatRelativeTime } from "@/lib/utils";
import { getAdminService } from "@/server/container";

export const metadata: Metadata = { title: "Admin — Users" };

export default async function AdminUsersPage() {
  const users = await getAdminService().listUsers();

  return (
    <div className="overflow-x-auto rounded-2xl border border-border/60">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-border/60 bg-muted/40 text-left">
            <th className="p-3 font-medium">User</th>
            <th className="p-3 font-medium">Role</th>
            <th className="p-3 font-medium">Plan</th>
            <th className="p-3 font-medium">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-border/40 last:border-0">
              <td className="p-3">
                <p className="font-medium">{user.name ?? "—"}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </td>
              <td className="p-3 text-muted-foreground">{user.role}</td>
              <td className="p-3 text-muted-foreground">{user.plan}</td>
              <td className="p-3 text-muted-foreground">
                {formatRelativeTime(user.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
