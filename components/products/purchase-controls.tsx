"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Minus,
  ShoppingCart,
  Check,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface PurchaseControlsProps {
  quantity: number;
  setQuantity: (q: number) => void;
  minOrder: number;
  stock: number;
  addedToCart: boolean;
  onAddToCart: () => void;
  totalPrice: number;
}

export function PurchaseControls({
  quantity,
  setQuantity,
  minOrder,
  stock,
  addedToCart,
  onAddToCart,
  totalPrice,
}: PurchaseControlsProps) {
  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > minOrder) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="space-y-4 mt-8 pt-6 border-t border-border/50">
      {/* Quantity */}
      <div>
          <label className="text-sm font-bold block mb-2">Quantité</label>
          <div className="flex items-center border border-border/60 rounded-xl p-1.5 bg-secondary/30">
            <button
              onClick={decrementQuantity}
              disabled={quantity === minOrder}
              className="p-2.5 disabled:opacity-30 hover:bg-card rounded-lg transition-all"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="number"
              value={quantity}
              min={minOrder}
              onChange={(e) => {
                const val = Math.max(
                  minOrder,
                  parseInt(e.target.value) || minOrder
                );
                setQuantity(val);
              }}
              className="flex-1 text-center bg-transparent outline-none font-bold text-lg"
            />
            <button
              onClick={incrementQuantity}
              className="p-2.5 hover:bg-card rounded-lg transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Commande minimale: {minOrder} unités
          </p>
        </div>

      {/* Stock indicator */}
      <div className="flex items-center gap-2">
        {stock === 0 ? (
          <span className="text-destructive text-sm font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-destructive" />
            Rupture de stock
          </span>
        ) : stock > 100 ? (
          <span className="text-emerald-600 text-sm font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            En stock ({stock} unités)
          </span>
        ) : (
          <span className="text-amber-600 text-sm font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse-soft" />
            Stock limité: {stock} unités
          </span>
        )}
      </div>

      {/* Buttons */}
      <>
        <Button
          onClick={onAddToCart}
          size="lg"
          className="w-full rounded-xl gap-2 text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
          disabled={stock === 0}
          variant={addedToCart ? "outline" : "default"}
        >
          {addedToCart ? (
            <>
              <Check className="w-5 h-5" />
              Ajouté au panier !
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              Ajouter au panier — {formatPrice(totalPrice)}
            </>
          )}
        </Button>

        <Link href="/cart">
          <Button variant="outline" className="w-full rounded-xl" size="lg">
            Voir le panier
          </Button>
        </Link>
      </>
    </div>
  );
}
