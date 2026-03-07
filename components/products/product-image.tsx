"use client";

import Image from "next/image";
import { FALLBACK_IMAGE } from "@/lib/mock-data";
import { Truck, Shield, Clock, Package } from "lucide-react";

interface ProductImageProps {
  image: string;
  name: string;
  stock: number;
  imgError: boolean;
  setImgError: (error: boolean) => void;
}

export function ProductImage({
  image,
  name,
  stock,
  imgError,
  setImgError,
}: ProductImageProps) {
  return (
    <div className="space-y-4">
      <div className="relative w-full aspect-square bg-gradient-to-br from-secondary to-muted rounded-2xl overflow-hidden group">
        <Image
          src={imgError ? FALLBACK_IMAGE : image}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          onError={() => setImgError(true)}
        />

        {/* Stock Badge */}
        {stock === 0 && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
            <div className="bg-white/90 dark:bg-black/90 rounded-2xl px-6 py-4 text-center">
              <Package className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="font-bold">Rupture de Stock</p>
            </div>
          </div>
        )}
      </div>

      {/* Trust Strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Truck, label: "Livraison 24h" },
          { icon: Shield, label: "Qualité garantie" },
          { icon: Clock, label: "Support 24/7" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-card border border-border/50"
          >
            <item.icon className="w-4 h-4 text-primary" />
            <span className="text-[11px] text-muted-foreground font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
