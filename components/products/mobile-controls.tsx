"use client";

import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MobileControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
  activeFiltersCount: number;
  categoryIcons: Record<string, string>;
  categories?: string[];
}

export function MobileControls({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  showMobileFilters,
  setShowMobileFilters,
  activeFiltersCount,
  categoryIcons,
  categories = [],
}: MobileControlsProps) {
  return (
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
          {categories.map((category) => (
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
  );
}
