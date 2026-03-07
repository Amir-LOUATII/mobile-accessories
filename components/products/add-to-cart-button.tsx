"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingCart, Check } from "lucide-react";

interface AddToCartButtonProps {
  productId: string;
  minOrder: number;
  stock: number;
}

export function AddToCartButton({
  productId,
  minOrder,
  stock,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(minOrder);
  const [showAddSuccess, setShowAddSuccess] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(productId, quantity);
    setShowAddSuccess(true);
    setTimeout(() => setShowAddSuccess(false), 2000);
  };

  const incrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity((q) => q + 1);
  };

  const decrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > minOrder) {
      setQuantity((q) => q - 1);
    }
  };

  return (
    <>
      {/* Quantity Selector */}
      <div
        className="flex items-center gap-1 border border-border/60 rounded-xl p-1.5 bg-secondary/30"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <button
          onClick={decrementQuantity}
          disabled={quantity === minOrder}
          className="p-1.5 hover:bg-card rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const val = Math.max(
              minOrder,
              parseInt(e.target.value) || minOrder
            );
            setQuantity(val);
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="flex-1 text-center bg-transparent font-bold text-sm focus:outline-none"
          min={minOrder}
        />
        <button
          onClick={incrementQuantity}
          className="p-1.5 hover:bg-card rounded-lg transition-all duration-200"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        className="w-full rounded-xl gap-2 font-semibold transition-all duration-300"
        disabled={stock === 0}
        variant={showAddSuccess ? "outline" : "default"}
      >
        {showAddSuccess ? (
          <>
            <Check className="w-4 h-4" />
            Ajouté !
          </>
        ) : stock === 0 ? (
          "Indisponible"
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            Ajouter au panier
          </>
        )}
      </Button>
    </>
  );
}
