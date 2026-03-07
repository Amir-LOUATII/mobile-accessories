"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, Loader2 } from "lucide-react";
import { ProductsTable } from "@/components/admin/products-table";
import { MiniStats } from "@/components/admin/mini-stats";
import { getProducts, deleteProduct } from "@/app/actions/products";
import { formatPrice } from "@/lib/utils";

interface DBProduct {
  id: number;
  name: string;
  slug: string;
  categoryId: number;
  description: string;
  image: string;
  basePrice: string;
  stock: number;
  minOrder: number;
  badge: string | null;
  category: { id: number; name: string; slug: string };
  wholesalePrices: { id: number; quantity: number; price: string }[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await getProducts();
      if (res.error) throw new Error(res.error);
      setProducts((res.products as DBProduct[]) || []);
    } catch {
      setError("Impossible de charger les produits.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce produit ?")) return;
    try {
      const res = await deleteProduct(id);
      if (res.error) throw new Error(res.error);
      setProducts((prev) => prev.filter((p) => p.id.toString() !== id));
    } catch {
      alert("Erreur lors de la suppression.");
    }
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
      value:
        products.length > 0
          ? formatPrice(products.reduce((sum, p) => sum + parseFloat(p.basePrice), 0) / products.length)
          : formatPrice(0),
    },
  ];

  // Map DB products to the shape ProductsTable expects
  const tableProducts = products.map((p) => ({
    id: p.id.toString(),
    name: p.name,
    category: p.category?.name || "—",
    description: p.description,
    image: p.image,
    basePrice: parseFloat(p.basePrice),
    wholesalePrices: (p.wholesalePrices || []).map((wp) => ({
      quantity: wp.quantity,
      price: parseFloat(wp.price),
    })),
    stock: p.stock,
    minOrder: p.minOrder,
    badge: p.badge || undefined,
  }));

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Gestion des Produits
        </h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2 rounded-xl"
            onClick={fetchProducts}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Actualiser</span>
          </Button>
          <Link href="/admin/products/add">
            <Button className="gap-2 rounded-xl w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              Ajouter Produit
            </Button>
          </Link>
        </div>
      </div>

      {/* ── Stats ── */}
      <MiniStats stats={miniStats} />

      {/* ── Error ── */}
      {error && (
        <div className="p-4 bg-red-100 border border-red-300 rounded-xl text-red-800 font-medium">
          ⚠️ {error}
        </div>
      )}

      {/* ── Loading ── */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Chargement…</span>
        </div>
      )}

      {/* ── Empty ── */}
      {!isLoading && !error && products.length === 0 && (
        <div className="text-center py-12 border border-border rounded-xl bg-card">
          <p className="text-muted-foreground mb-4">Aucun produit enregistré.</p>
          <Link href="/admin/products/add">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Ajouter votre premier produit
            </Button>
          </Link>
        </div>
      )}

      {/* ── Products Table ── */}
      {!isLoading && tableProducts.length > 0 && (
        <ProductsTable products={tableProducts} onDelete={handleDelete} />
      )}
    </div>
  );
}
