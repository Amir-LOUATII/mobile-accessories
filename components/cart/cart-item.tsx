"use client";

import { useState } from "react";
import Image from "next/image";
import { FALLBACK_IMAGE } from "@/lib/mock-data";
import { Trash2, Plus, Minus } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface CartItemCardProps {
  productId: string;
  name: string;
  category: string;
  image: string;
  quantity: number;
  unitPrice: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CartItemCard({
  productId,
  name,
  category,
  image,
  quantity,
  unitPrice,
  onUpdateQuantity,
  onRemove,
}: CartItemCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-card border border-border/50 rounded-2xl p-3 sm:p-5 flex gap-3 sm:gap-5 hover:shadow-lg hover:border-primary/10 transition-all duration-300">
      {/* Product Image */}
      <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-secondary">
        <Image
          src={imgError ? FALLBACK_IMAGE : image}
          alt={name}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 80px, 112px"
          className="object-cover"
          onError={() => setImgError(true)}
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary/70">
            {category}
          </span>
          <h3 className="font-bold text-sm sm:text-base md:text-lg truncate">
            {name}
          </h3>
        </div>

        {/* Quantity and Price */}
        <div className="flex items-center justify-between mt-2 sm:mt-3 flex-wrap gap-2 sm:gap-3">
          <div className="flex items-center gap-1 border border-border/60 rounded-xl p-1 bg-secondary/30">
            <button
              onClick={() => onUpdateQuantity(productId, quantity - 1)}
              className="p-1 sm:p-1.5 hover:bg-card rounded-lg transition"
            >
              <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
            <span className="w-8 sm:w-10 text-center font-bold text-xs sm:text-sm">
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(productId, quantity + 1)}
              className="p-1 sm:p-1.5 hover:bg-card rounded-lg transition"
            >
              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>

          <div className="text-right">
            <div className="font-black text-base sm:text-lg">
              {formatPrice(unitPrice * quantity)}
            </div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">
              {formatPrice(unitPrice)} /unité
            </div>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(productId)}
        className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-xl p-1.5 sm:p-2.5 transition-all self-start"
      >
        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
}
