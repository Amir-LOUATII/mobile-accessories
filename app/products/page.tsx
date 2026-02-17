"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { MOCK_PRODUCTS, CATEGORIES } from "@/lib/mock-data";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [sortBy, setSortBy] = useState("relevance");

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = MOCK_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "Tous" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice =
        product.basePrice >= priceRange.min &&
        product.basePrice <= priceRange.max;

      return matchesCategory && matchesSearch && matchesPrice;
    });

    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [selectedCategory, searchQuery, priceRange, sortBy]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Modern Header */}
        <section className="border-b border-border py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Catalogue
              <span className="block text-primary">Accessoires Mobile</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Produits premium pour revendeurs modernes.
            </p>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <aside className="hidden lg:block w-72 border-r border-border bg-card p-8 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="space-y-8">
              {/* Search */}
              <div>
                <h3 className="font-semibold mb-3">Rechercher</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Produits..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3">Catégories</h3>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition ${
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "bg-background hover:bg-muted border border-border"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="font-semibold mb-3">Tri</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-xl bg-background"
                >
                  <option value="relevance">Pertinence</option>
                  <option value="price-low">Prix croissant</option>
                  <option value="price-high">Prix décroissant</option>
                  <option value="name">Nom A-Z</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <section className="flex-1 px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-6xl mx-auto">
              {/* Mobile Search */}
              <div className="lg:hidden mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold">
                  {filteredAndSortedProducts.length} produit
                  {filteredAndSortedProducts.length !== 1 ? "s" : ""}
                </h2>
              </div>

              {/* Grid */}
              {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedProducts.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                      <ProductCard product={product} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-6">
                    Aucun produit trouvé.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("Tous");
                      setSearchQuery("");
                      setPriceRange({ min: 0, max: 500 });
                      setSortBy("relevance");
                    }}
                    className="text-primary font-medium hover:underline"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
