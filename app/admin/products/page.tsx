"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProductsTable } from "@/components/admin/products-table";
import { MiniStats } from "@/components/admin/mini-stats";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const miniStats = [
    { label: "Produits Totaux", value: products.length },
    {
      label: "Faible Stock",
      value: products.filter((p) => p.stock < 100).length,
      color: "text-amber-600",
    },
    {
      label: "Prix Moyen",
      value: `$${(
        products.reduce((sum, p) => sum + p.basePrice, 0) / products.length
      ).toFixed(2)}`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Gestion des Produits
        </h1>
        <Link href="/admin/products/add">
          <Button className="gap-2 rounded-xl w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            Ajouter Produit
          </Button>
        </Link>
      </div>

      {/* ── Products Table ── */}
      <ProductsTable products={products} onDelete={handleDelete} />

      {/* ── Stats ── */}
      <MiniStats stats={miniStats} />
    </div>
  );
}
