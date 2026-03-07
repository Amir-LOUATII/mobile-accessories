"use client";

import { useState } from "react";
import Image from "next/image";
import { FALLBACK_IMAGE } from "@/lib/mock-data";

interface ProductCardImageProps {
  image: string;
  name: string;
  stock: number;
  badge?: string;
  badgeColors: Record<string, string>;
}

export function ProductCardImage({
  image,
  name,
  stock,
  badge,
  badgeColors,
}: ProductCardImageProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-secondary to-muted overflow-hidden">
      <Image
        src={imgError ? FALLBACK_IMAGE : image}
        alt={name}
        fill
        loading="lazy"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`object-cover transition-all duration-500 ${
          stock === 0 ? "opacity-30 grayscale" : "group-hover:scale-110"
        }`}
        onError={() => setImgError(true)}
      />

      {/* Badge */}
      {badge && stock > 0 && (
        <div
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
            badgeColors[badge] || "bg-primary text-primary-foreground"
          }`}
        >
          {badge}
        </div>
      )}

      {/* Out of Stock Overlay */}
      {stock === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/30 to-black/10">
          <div className="bg-red-600/90 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl shadow-lg text-center">
            <div className="font-bold text-sm tracking-wide">
              Rupture de stock
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
