"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, Loader2 } from "lucide-react";
import { ProductsTable } from "@/components/admin/products-table";
import { MiniStats } from "@/components/admin/mini-stats";
import { getProducts, deleteProduct } from "@/app/actions/products";
import { formatPrice } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await getProducts({ page: currentPage, limit: 10 });
      if (res.error) throw new Error(res.error);
      setProducts((res.products as DBProduct[]) || []);
      if (res.pagination) {
        setTotalPages(res.pagination.totalPages);
        setTotalItems(res.pagination.totalItems);
      }
    } catch {
      setError("Impossible de charger les produits.");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

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
    { label: "Produits Totaux", value: totalItems },
    {
      label: "Faible Stock",
      value: products.filter((p) => p.stock < 100).length,
      color: "text-amber-600",
    },
    {
      label: "Prix Moyen (Page)",
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

      {/* ── Loading Skeletons ── */}
      {isLoading && (
        <div className="border border-border rounded-xl bg-card overflow-hidden">
          <div className="bg-secondary/30 p-4 border-b border-border flex justify-between">
            <Skeleton className="w-[100px] h-4" />
            <Skeleton className="w-[150px] h-4 hidden sm:block" />
            <Skeleton className="w-[100px] h-4 hidden md:block" />
            <Skeleton className="w-[80px] h-4" />
            <Skeleton className="w-[60px] h-4" />
          </div>
          <div className="p-4 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-12 h-12 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="w-[150px] h-4" />
                    <Skeleton className="w-[100px] h-3" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <Skeleton className="w-[100px] h-4" />
                </div>
                <div className="hidden md:block">
                  <Skeleton className="w-[60px] h-4" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="w-8 h-8 rounded-md" />
                  <Skeleton className="w-8 h-8 rounded-md" />
                </div>
              </div>
            ))}
          </div>
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
        <>
          <ProductsTable products={tableProducts} onDelete={handleDelete} />
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); if (currentPage > 1) setCurrentPage(p => p - 1); }} 
                      className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    if (
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={i}>
                          <PaginationLink 
                            href="#" 
                            isActive={currentPage === page}
                            onClick={(e) => { e.preventDefault(); setCurrentPage(page); }}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      page === currentPage - 2 || 
                      page === currentPage + 2
                    ) {
                      return (
                        <PaginationItem key={i}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) setCurrentPage(p => p + 1); }} 
                      className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
}
