"use client";

import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { Product } from "@/lib/mock-data";

interface ProductGridProps {
  products: Product[];
  resetFilters: () => void;
}

export function ProductGrid({ products, resetFilters }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 space-y-4">
        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-bold">Aucun produit trouvé</h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Essayez de modifier vos critères de recherche ou de réinitialiser les
          filtres.
        </p>
        <Button
          onClick={resetFilters}
          variant="outline"
          className="rounded-xl mt-2"
        >
          Réinitialiser les filtres
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}
