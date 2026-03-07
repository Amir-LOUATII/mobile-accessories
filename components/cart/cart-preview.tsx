"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { MOCK_PRODUCTS, FALLBACK_IMAGE } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export function CartPreview() {
  const { items, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Votre panier est vide.
        </p>
        <Link href="/products">
          <Button variant="outline" size="sm" className="w-full">
            Découvrir nos produits
          </Button>
        </Link>
      </div>
    );
  }

  // Preview max 3 items
  const previewItems = items.slice(0, 3);
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col w-80 max-h-[85vh]">
      {/* Header */}
      <div className="p-4 border-b border-border/50 bg-secondary/30">
        <h3 className="font-bold text-sm">Aperçu du panier</h3>
        <p className="text-xs text-muted-foreground">
          {items.length} article(s) • {totalUnits} unités
        </p>
      </div>

      {/* Items */}
      <div className="p-3 overflow-y-auto space-y-3">
        {previewItems.map((item) => {
          const product = MOCK_PRODUCTS.find((p) => p.id === item.productId);
          if (!product) return null;

          return (
            <div key={item.productId} className="flex gap-3">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-secondary/50 flex-shrink-0">
                <Image
                  src={product.image || FALLBACK_IMAGE}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <p className="text-xs font-semibold truncate leading-tight">
                  {product.name}
                </p>
                <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Qté: {item.quantity}</span>
                  <span className="font-medium text-foreground">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {items.length > 3 && (
          <p className="text-[11px] text-center text-muted-foreground pt-1">
            + {items.length - 3} autre(s) article(s)...
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border/50 bg-card space-y-3 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-10">
        <div className="flex justify-between items-baseline mb-1">
          <span className="text-sm font-semibold text-muted-foreground">
            Total HT
          </span>
          <span className="text-lg font-black text-foreground">
            {formatPrice(total)}
          </span>
        </div>
        <Link href="/cart" className="block w-full">
          <Button className="w-full text-sm font-semibold rounded-xl" size="sm">
            Voir mon panier
          </Button>
        </Link>
      </div>
    </div>
  );
}
