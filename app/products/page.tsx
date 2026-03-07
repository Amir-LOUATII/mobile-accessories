"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Header } from "@/components/header";
import { ProductsHeader } from "@/components/products/products-header";
import { DesktopSidebar } from "@/components/products/desktop-sidebar";
import { MobileControls } from "@/components/products/mobile-controls";
import { ResultsHeader } from "@/components/products/results-header";
import { ProductGrid } from "@/components/products/product-grid";
import { Loader2 } from "lucide-react";
import { Product } from "@/lib/mock-data";
import { getProducts, getCategories } from "@/app/actions/products";
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

const CATEGORY_ICONS: Record<string, string> = {
  Tous: "📱",
  "Coques & Étuis": "🛡️",
  Chargeurs: "⚡",
  Câbles: "🔌",
  "Protections Écran": "🔲",
  Audio: "🎧",
  Supports: "📐",
  Batteries: "🔋",
};

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

interface DBCategory {
  id: number;
  name: string;
  slug: string;
  productCount: number;
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [dbProducts, setDbProducts] = useState<DBProduct[]>([]);
  const [dbCategories, setDbCategories] = useState<DBCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy]);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const [prodData, catData] = await Promise.all([
        getProducts({
          category: selectedCategory,
          search: searchQuery,
          sort: sortBy,
          page: currentPage,
          limit: 12,
        }),
        getCategories(),
      ]);
      setDbProducts((prodData.products as DBProduct[]) || []);
      if (prodData.pagination) {
        setTotalPages(prodData.pagination.totalPages);
        setTotalItems(prodData.pagination.totalItems);
      }
      setDbCategories((catData.categories as DBCategory[]) || []);
    } catch {
      // fall through
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, searchQuery, sortBy, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Map DB products to Product type used by components
  const products: Product[] = useMemo(
    () =>
      dbProducts.map((p) => ({
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
      })),
    [dbProducts]
  );

  // Build dynamic categories list: ["Tous", ...db categories]
  const dynamicCategories = useMemo(() => {
    return ["Tous", ...dbCategories.map((c) => c.name)];
  }, [dbCategories]);

  // Category-to-count mapping
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Tous: totalItems };
    for (const cat of dbCategories) {
      counts[cat.name] = cat.productCount;
    }
    return counts;
  }, [dbCategories, totalItems]);

  const activeFiltersCount =
    (selectedCategory !== "Tous" ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    (sortBy !== "relevance" ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory("Tous");
    setSearchQuery("");
    setSortBy("relevance");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* ── Page Header ── */}
        <ProductsHeader />

        <div className="flex flex-col lg:flex-row">
          {/* ── Desktop Sidebar ── */}
          <DesktopSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            activeFiltersCount={activeFiltersCount}
            resetFilters={resetFilters}
            categoryIcons={CATEGORY_ICONS}
            categories={dynamicCategories}
            categoryCounts={categoryCounts}
          />

          {/* ── Main Content ── */}
          <section className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <div className="max-w-6xl mx-auto">
              {/* ── Mobile Controls ── */}
              <MobileControls
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
                showMobileFilters={showMobileFilters}
                setShowMobileFilters={setShowMobileFilters}
                activeFiltersCount={activeFiltersCount}
                categoryIcons={CATEGORY_ICONS}
                categories={dynamicCategories}
              />

              {/* ── Results Header ── */}
              <ResultsHeader
                filteredCount={totalItems}
                selectedCategory={selectedCategory}
                categoryIcons={CATEGORY_ICONS}
                activeFiltersCount={activeFiltersCount}
                resetFilters={resetFilters}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />

              {/* ── Loading ── */}
              {isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 mt-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-4 bg-card border border-border/50 rounded-2xl p-4">
                      <Skeleton className="w-full aspect-[4/3] rounded-xl" />
                      <div className="space-y-3 mt-2">
                        <Skeleton className="w-3/4 h-5" />
                        <Skeleton className="w-1/2 h-4" />
                      </div>
                      <div className="flex gap-2 mt-auto pt-4">
                         <Skeleton className="w-1/3 h-6" />
                         <Skeleton className="w-1/4 h-6 ml-auto" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Product Grid ── */}
              {!isLoading && (
                <>
                  <ProductGrid
                    products={products}
                    resetFilters={resetFilters}
                  />
                  {totalPages > 1 && (
                    <div className="mt-8">
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
          </section>
        </div>
      </main>
    </>
  );
}
