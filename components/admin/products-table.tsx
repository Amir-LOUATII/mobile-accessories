"use client";

import { Product } from "@/lib/mock-data";
import { Edit2, Trash2 } from "lucide-react";

interface ProductsTableProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export function ProductsTable({ products, onDelete }: ProductsTableProps) {
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-border">
        {products.map((product) => (
          <div key={product.id} className="p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground">
                  {product.category}
                </p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button className="p-1.5 text-primary hover:bg-primary/10 rounded-lg transition">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="font-semibold">
                ${product.basePrice.toFixed(2)}
              </span>
              <span
                className={
                  product.stock < 100
                    ? "text-amber-600 font-semibold"
                    : "text-muted-foreground"
                }
              >
                Stock: {product.stock}
              </span>
              <span className="text-muted-foreground">
                Min: {product.minOrder}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary border-b border-border">
            <tr>
              <th className="text-left px-4 lg:px-6 py-3 font-semibold text-sm">
                Nom
              </th>
              <th className="text-left px-4 lg:px-6 py-3 font-semibold text-sm">
                Catégorie
              </th>
              <th className="text-left px-4 lg:px-6 py-3 font-semibold text-sm">
                Prix de Base
              </th>
              <th className="text-left px-4 lg:px-6 py-3 font-semibold text-sm">
                Stock
              </th>
              <th className="text-left px-4 lg:px-6 py-3 font-semibold text-sm">
                Min
              </th>
              <th className="text-left px-4 lg:px-6 py-3 font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-border hover:bg-secondary/50 transition"
              >
                <td className="px-4 lg:px-6 py-4 font-semibold text-sm max-w-[200px] truncate">
                  {product.name}
                </td>
                <td className="px-4 lg:px-6 py-4 text-sm">
                  {product.category}
                </td>
                <td className="px-4 lg:px-6 py-4 text-sm">
                  ${product.basePrice.toFixed(2)}
                </td>
                <td className="px-4 lg:px-6 py-4 text-sm">
                  <span
                    className={
                      product.stock < 100
                        ? "text-amber-600 font-semibold"
                        : ""
                    }
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-4 lg:px-6 py-4 text-sm">
                  {product.minOrder}
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="flex gap-1.5">
                    <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
