'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product, getWholesalePrice } from '@/lib/mock-data';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(product.minOrder);
  const [showAddSuccess, setShowAddSuccess] = useState(false);

  const currentPrice = getWholesalePrice(product, quantity);
  const savings = ((product.basePrice - currentPrice) / product.basePrice * 100).toFixed(0);

  const handleAddToCart = () => {
    addItem(product.id, quantity);
    setShowAddSuccess(true);
    setTimeout(() => setShowAddSuccess(false), 2000);
  };

  const incrementQuantity = () => {
    setQuantity(q => q + 1);
  };

  const decrementQuantity = () => {
    if (quantity > product.minOrder) {
      setQuantity(q => q - 1);
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col h-full">
      {/* Image Container */}
      <div className="relative w-full h-48 bg-secondary overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition duration-300 ${product.stock === 0 ? 'opacity-40' : 'hover:scale-105'}`}
          crossOrigin="anonymous"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-center">
              <div className="text-white text-lg font-bold">Rupture de Stock</div>
              <div className="text-white/80 text-sm">Non Disponible</div>
            </div>
          </div>
        )}
        {savings !== '0' && product.stock > 0 && (
          <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
            Économiser {savings}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 space-y-3">
        {/* Category */}
        <div className="text-sm text-foreground/60">{product.category}</div>

        {/* Title */}
        <h3 className="font-bold text-lg line-clamp-2">{product.name}</h3>

        {/* Description */}
        <p className="text-sm text-foreground/70 line-clamp-2 flex-1">{product.description}</p>

        {/* Pricing */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">${currentPrice.toFixed(2)}</span>
            {currentPrice < product.basePrice && (
              <span className="text-sm text-foreground/60 line-through">${product.basePrice.toFixed(2)}</span>
            )}
          </div>
          {product.wholesalePrices.length > 0 && (
            <div className="text-xs text-foreground/60">
              Commande min: {product.minOrder} unités
            </div>
          )}
        </div>

        {/* Wholesale Tiers Info */}
        {product.wholesalePrices.length > 0 && (
          <div className="text-xs text-foreground/60 space-y-1 bg-secondary/50 p-2 rounded">
            <div className="font-semibold">Tarification en gros:</div>
            {product.wholesalePrices.map((tier, idx) => (
              <div key={idx}>
                {tier.quantity}+ unités: ${tier.price.toFixed(2)}
              </div>
            ))}
          </div>
        )}

        {/* Quantity Selector */}
        <div className="flex items-center gap-2 border border-border rounded-lg p-2">
          <button
            onClick={decrementQuantity}
            disabled={quantity === product.minOrder}
            className="p-1 hover:bg-secondary rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              const val = Math.max(product.minOrder, parseInt(e.target.value) || product.minOrder);
              setQuantity(val);
            }}
            className="flex-1 text-center bg-transparent font-semibold focus:outline-none"
            min={product.minOrder}
          />
          <button
            onClick={incrementQuantity}
            className="p-1 hover:bg-secondary rounded transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Stock Status */}
        <div className="text-xs text-foreground/60">
          {product.stock === 0 ? (
            <span className="text-red-600 font-semibold">Rupture de Stock</span>
          ) : product.stock > 10 ? (
            <span className="text-green-600">En stock</span>
          ) : (
            <span className="text-amber-600">{product.stock} restants en stock</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full"
          disabled={product.stock === 0}
        >
          {showAddSuccess ? '✓ Ajouté au panier' : 'Ajouter au panier'}
        </Button>
      </div>
    </div>
  );
}
