"use client";

import { X } from "lucide-react";

interface ResultsHeaderProps {
  filteredCount: number;
  selectedCategory: string;
  categoryIcons: Record<string, string>;
  activeFiltersCount: number;
  resetFilters: () => void;
}

export function ResultsHeader({
  filteredCount,
  selectedCategory,
  categoryIcons,
  activeFiltersCount,
  resetFilters,
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
  );
}
