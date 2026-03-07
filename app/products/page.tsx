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

  const [dbProducts, setDbProducts] = useState<DBProduct[]>([]);
  const [dbCategories, setDbCategories] = useState<DBCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const [prodData, catData] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);
      setDbProducts((prodData.products as DBProduct[]) || []);
      setDbCategories((catData.categories as DBCategory[]) || []);
    } catch {
      // fall through
    } finally {
      setIsLoading(false);
    }
  }, []);

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
    const counts: Record<string, number> = { Tous: products.length };
    for (const cat of dbCategories) {
      counts[cat.name] = cat.productCount;
    }
    return counts;
  }, [dbCategories, products]);

  // Filter & sort
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "Tous" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [selectedCategory, searchQuery, sortBy, products]);

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
                filteredCount={filteredAndSortedProducts.length}
                selectedCategory={selectedCategory}
                categoryIcons={CATEGORY_ICONS}
                activeFiltersCount={activeFiltersCount}
                resetFilters={resetFilters}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />

              {/* ── Loading ── */}
              {isLoading && (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground">Chargement des produits…</span>
                </div>
              )}

              {/* ── Product Grid ── */}
              {!isLoading && (
                <ProductGrid
                  products={filteredAndSortedProducts}
                  resetFilters={resetFilters}
                />
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
