"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FALLBACK_IMAGE, Product } from "@/lib/mock-data";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="border-t border-border/50 bg-secondary/20 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-6">Produits similaires</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {products.map((p) => (
            <RelatedProductItem key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedProductItem({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex gap-4 bg-card border border-border/50 rounded-2xl p-4 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
    >
      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
        <Image
          src={imgError ? FALLBACK_IMAGE : product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          onError={() => setImgError(true)}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">À partir de</p>
        <p className="text-base font-extrabold mt-0.5">
          {product.basePrice.toFixed(2)}€
        </p>
      </div>
    </Link>
  );
}
