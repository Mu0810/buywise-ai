import type { Metadata } from "next";

import { getAdminService } from "@/server/container";

export const metadata: Metadata = { title: "Admin — Products" };

export default async function AdminProductsPage() {
  const products = await getAdminService().listProducts();

  return (
    <div className="overflow-x-auto rounded-2xl border border-border/60">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-border/60 bg-muted/40 text-left">
            <th className="p-3 font-medium">Product</th>
            <th className="p-3 font-medium">Category</th>
            <th className="p-3 font-medium">Brand</th>
            <th className="p-3 font-medium">AI</th>
            <th className="p-3 font-medium">Rating</th>
            <th className="p-3 font-medium">Offers</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-border/40 last:border-0"
            >
              <td className="p-3 font-medium">{product.name}</td>
              <td className="p-3 text-muted-foreground">
                {product.category.name}
              </td>
              <td className="p-3 text-muted-foreground">{product.brand.name}</td>
              <td className="p-3 tabular-nums">{product.aiScore ?? "—"}</td>
              <td className="p-3 tabular-nums">{product.rating ?? "—"}</td>
              <td className="p-3 tabular-nums">{product._count.offers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
