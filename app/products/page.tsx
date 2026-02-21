"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { MOCK_PRODUCTS, CATEGORIES } from "@/lib/mock-data";
import { Search, SlidersHorizontal, X, ChevronDown, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  const categoryIcons: Record<string, string> = {
    'Tous': '📱',
    'Coques & Étuis': '🛡️',
    'Chargeurs': '⚡',
    'Câbles': '🔌',
    'Protections Écran': '🔲',
    'Audio': '🎧',
    'Supports': '📐',
    'Batteries': '🔋',
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Page Header */}
        <section className="relative overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Catalogue
                <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mt-1">
                  Accessoires Mobile
                </span>
              </h1>
              <p className="mt-4 text-muted-foreground text-base sm:text-lg">
                Parcourez notre sélection de {MOCK_PRODUCTS.length} produits premium avec tarification dégressive.
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row">
          {/* ── Desktop Sidebar ── */}
          <aside className="hidden lg:block w-[280px] border-r border-border/50 bg-card/50 sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto">
            <div className="p-6 space-y-8">
              {/* Search */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
                  Rechercher
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Nom, marque..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 rounded-xl bg-background border-border/60"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
                  Catégories
                </label>
                <div className="space-y-1.5">
                  {CATEGORIES.map((category) => {
                    const count = category === 'Tous'
                      ? MOCK_PRODUCTS.length
                      : MOCK_PRODUCTS.filter(p => p.category === category).length;

                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between group ${
                          selectedCategory === category
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                            : "hover:bg-secondary/80 text-foreground/70 hover:text-foreground"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-base">{categoryIcons[category] || '📦'}</span>
                          {category}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          selectedCategory === category
                            ? "bg-primary-foreground/20 text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
                  Trier par
                </label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-border/60 rounded-xl bg-background text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  >
                    <option value="relevance">Pertinence</option>
                    <option value="price-low">Prix croissant</option>
                    <option value="price-high">Prix décroissant</option>
                    <option value="name">Nom A-Z</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Reset Filters */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200 flex items-center justify-center gap-1.5 py-2"
                >
                  <X className="w-3.5 h-3.5" />
                  Réinitialiser ({activeFiltersCount})
                </button>
              )}
            </div>
          </aside>

          {/* ── Main Content ── */}
          <section className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <div className="max-w-6xl mx-auto">
              {/* Mobile Controls */}
              <div className="lg:hidden space-y-4 mb-6">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>

                {/* Filter Toggle */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="flex-1 rounded-xl gap-2"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filtres
                    {activeFiltersCount > 0 && (
                      <span className="bg-primary text-primary-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </Button>

                  <div className="relative flex-1">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3.5 py-2 border border-border rounded-xl bg-background text-sm appearance-none"
                    >
                      <option value="relevance">Pertinence</option>
                      <option value="price-low">Prix ↑</option>
                      <option value="price-high">Prix ↓</option>
                      <option value="name">Nom A-Z</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                {/* Mobile Category Pills */}
                {showMobileFilters && (
                  <div className="flex flex-wrap gap-2 animate-slide-up">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                          selectedCategory === category
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "bg-secondary text-foreground/70 hover:bg-secondary/80"
                        }`}
                      >
                        {categoryIcons[category]} {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold">
                    {filteredAndSortedProducts.length} produit
                    {filteredAndSortedProducts.length !== 1 ? "s" : ""}
                  </h2>
                  {selectedCategory !== "Tous" && (
                    <p className="text-sm text-muted-foreground mt-0.5">
                      dans {categoryIcons[selectedCategory]} {selectedCategory}
                    </p>
                  )}
                </div>

                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="hidden lg:flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    Réinitialiser
                  </button>
                )}
              </div>

              {/* Product Grid */}
              {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
                  {filteredAndSortedProducts.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                      <ProductCard product={product} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 space-y-4">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-bold">Aucun produit trouvé</h3>
                  <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                    Essayez de modifier vos critères de recherche ou de réinitialiser les filtres.
                  </p>
                  <Button
                    onClick={resetFilters}
                    variant="outline"
                    className="rounded-xl mt-2"
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
