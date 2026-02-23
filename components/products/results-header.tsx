"use client";

import { X, ChevronDown } from "lucide-react";

interface ResultsHeaderProps {
  filteredCount: number;
  selectedCategory: string;
  categoryIcons: Record<string, string>;
  activeFiltersCount: number;
  resetFilters: () => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export function ResultsHeader({
  filteredCount,
  selectedCategory,
  categoryIcons,
  activeFiltersCount,
  resetFilters,
  sortBy,
  setSortBy,
}: ResultsHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-lg font-bold">
          {filteredCount} produit
          {filteredCount !== 1 ? "s" : ""}
        </h2>
        {selectedCategory !== "Tous" && (
          <p className="text-sm text-muted-foreground mt-0.5">
            dans {categoryIcons[selectedCategory]} {selectedCategory}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Sort Dropdown */}
        <div className="relative hidden sm:block">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3.5 py-2 border border-border/60 rounded-xl bg-background text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all pr-9"
          >
            <option value="relevance">Pertinence</option>
            <option value="price-low">Prix croissant</option>
            <option value="price-high">Prix décroissant</option>
            <option value="name">Nom A-Z</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>

        {/* Reset Link */}
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
    </div>
  );
}
