import type { Metadata } from "next";

import { getAdminService } from "@/server/container";

export const metadata: Metadata = { title: "Admin — Stores" };

export default async function AdminStoresPage() {
  const stores = await getAdminService().listStores();

  return (
    <div className="overflow-x-auto rounded-2xl border border-border/60">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-border/60 bg-muted/40 text-left">
            <th className="p-3 font-medium">Store</th>
            <th className="p-3 font-medium">Type</th>
            <th className="p-3 font-medium">Official</th>
            <th className="p-3 font-medium">Offers</th>
            <th className="p-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr
              key={store.id}
              className="border-b border-border/40 last:border-0"
            >
              <td className="p-3 font-medium">{store.name}</td>
              <td className="p-3 text-muted-foreground">{store.type}</td>
              <td className="p-3 text-muted-foreground">
                {store.isOfficialChannel ? "Yes" : "—"}
              </td>
              <td className="p-3 tabular-nums">{store._count.offers}</td>
              <td className="p-3">
                <span
                  className={
                    store.isActive
                      ? "rounded-full bg-success/10 px-2 py-0.5 text-xs text-success"
                      : "rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  }
                >
                  {store.isActive ? "Active" : "Inactive"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
