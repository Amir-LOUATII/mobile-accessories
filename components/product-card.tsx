'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product, FALLBACK_IMAGE } from '@/lib/mock-data';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Plus, Minus, ShoppingCart, Check, Package } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(product.minOrder);
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id, quantity);
    setShowAddSuccess(true);
    setTimeout(() => setShowAddSuccess(false), 2000);
  };

  const incrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(q => q + 1);
  };

  const decrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > product.minOrder) {
      setQuantity(q => q - 1);
    }
  };

  const badgeColors: Record<string, string> = {
    'Best-seller': 'bg-accent text-accent-foreground',
    'Nouveau': 'bg-primary text-primary-foreground',
    'Populaire': 'bg-purple-500 text-white',
    'Volume': 'bg-emerald-500 text-white',
    'Tendance': 'bg-pink-500 text-white',
    'Pro': 'bg-amber-500 text-white',
  };

  return (
    <div className={`group bg-card border border-border/60 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 flex flex-col h-full ${product.stock === 0 ? 'opacity-75' : ''}`}>
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-secondary to-muted overflow-hidden">
        <Image
          src={imgError ? FALLBACK_IMAGE : product.image}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-500 ${product.stock === 0 ? 'opacity-30 grayscale' : 'group-hover:scale-110'}`}
          onError={() => setImgError(true)}
        />

        {/* Badge */}
        {product.badge && product.stock > 0 && (
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${badgeColors[product.badge] || 'bg-primary text-primary-foreground'}`}>
            {product.badge}
          </div>
        )}

        {/* Out of Stock Overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/30 to-black/10">
            <div className="bg-red-600/90 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl shadow-lg text-center">
              <div className="font-bold text-sm tracking-wide">Rupture de stock</div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        {/* Category */}
        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary/70">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="font-bold text-[15px] leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 flex-1 leading-relaxed">
          {product.description}
        </p>

        {/* Pricing */}
        <div className="space-y-1 pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-foreground">
              {product.basePrice.toFixed(2)}€
            </span>
            <span className="text-[10px] text-muted-foreground">/unité</span>
          </div>

          {/* Min order */}
          <p className="text-[11px] text-muted-foreground">
            Min. {product.minOrder} unités
          </p>
        </div>

        {/* Quantity Selector */}
        <div
          className="flex items-center gap-1 border border-border/60 rounded-xl p-1.5 bg-secondary/30"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        >
          <button
            onClick={decrementQuantity}
            disabled={quantity === product.minOrder}
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
              const val = Math.max(product.minOrder, parseInt(e.target.value) || product.minOrder);
              setQuantity(val);
            }}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="flex-1 text-center bg-transparent font-bold text-sm focus:outline-none"
            min={product.minOrder}
          />
          <button
            onClick={incrementQuantity}
            className="p-1.5 hover:bg-card rounded-lg transition-all duration-200"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-1.5">
          {product.stock === 0 ? (
            <span className="text-destructive text-xs font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive inline-block" />
              Rupture de Stock
            </span>
          ) : product.stock > 100 ? (
            <span className="text-emerald-600 text-xs font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              En stock
            </span>
          ) : (
            <span className="text-amber-600 text-xs font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block animate-pulse-soft" />
              {product.stock} restants
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full rounded-xl gap-2 font-semibold transition-all duration-300"
          disabled={product.stock === 0}
          variant={showAddSuccess ? "outline" : "default"}
        >
          {showAddSuccess ? (
            <>
              <Check className="w-4 h-4" />
              Ajouté !
            </>
          ) : product.stock === 0 ? (
            'Indisponible'
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Ajouter au panier
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
