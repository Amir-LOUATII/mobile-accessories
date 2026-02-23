"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { ProductsHeader } from "@/components/products/products-header";
import { DesktopSidebar } from "@/components/products/desktop-sidebar";
import { MobileControls } from "@/components/products/mobile-controls";
import { ResultsHeader } from "@/components/products/results-header";
import { ProductGrid } from "@/components/products/product-grid";

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

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = MOCK_PRODUCTS.filter((product) => {
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
  }, [selectedCategory, searchQuery, sortBy]);

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

              {/* ── Product Grid ── */}
              <ProductGrid
                products={filteredAndSortedProducts}
                resetFilters={resetFilters}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
