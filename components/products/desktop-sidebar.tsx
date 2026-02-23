"use client";

import { MOCK_PRODUCTS, CATEGORIES } from "@/lib/mock-data";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DesktopSidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  activeFiltersCount: number;
  resetFilters: () => void;
  categoryIcons: Record<string, string>;
}

export function DesktopSidebar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  activeFiltersCount,
  resetFilters,
  categoryIcons,
}: DesktopSidebarProps) {
  return (
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
              const count =
                category === "Tous"
                  ? MOCK_PRODUCTS.length
                  : MOCK_PRODUCTS.filter((p) => p.category === category).length;

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
                    <span className="text-base">
                      {categoryIcons[category] || "📦"}
                    </span>
                    {category}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedCategory === category
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
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
  );
}
