'use client';

import { useCart } from '@/lib/cart-context';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { MOCK_PRODUCTS, FALLBACK_IMAGE } from '@/lib/mock-data';
import Link from 'next/link';
import Image from 'next/image';
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingCart,
  Truck,
  Shield,
  CheckCircle,
  Package,
} from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center space-y-6 max-w-md mx-auto">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto">
                <ShoppingCart className="w-10 h-10 text-muted-foreground" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-black">Panier Vide</h1>
              <p className="text-muted-foreground leading-relaxed">
                Votre panier est vide. Explorez notre catalogue pour découvrir nos accessoires mobiles à prix grossiste.
              </p>
              <Link href="/products">
                <Button size="lg" className="gap-2 rounded-xl px-8 shadow-lg shadow-primary/25">
                  <ArrowLeft className="w-4 h-4" />
                  Explorer le catalogue
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Continuer les achats
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black">
              Panier d&apos;Achat
            </h1>
            <p className="text-muted-foreground mt-1">
              {items.length} article{items.length > 1 ? 's' : ''} · Vérifiez et validez votre commande
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => {
                const product = MOCK_PRODUCTS.find(p => p.id === item.productId);
                if (!product) return null;

                return (
                  <div
                    key={item.productId}
                    className="bg-card border border-border/50 rounded-2xl p-5 flex gap-5 hover:shadow-lg hover:border-primary/10 transition-all duration-300"
                  >
                    {/* Product Image */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-secondary">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary/70">
                          {product.category}
                        </span>
                        <h3 className="font-bold text-base sm:text-lg truncate">
                          {product.name}
                        </h3>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                        <div className="flex items-center gap-1 border border-border/60 rounded-xl p-1 bg-secondary/30">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-1.5 hover:bg-card rounded-lg transition"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-10 text-center font-bold text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-1.5 hover:bg-card rounded-lg transition"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="font-black text-lg">
                            {(item.price * item.quantity).toFixed(2)}€
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.price.toFixed(2)}€ /unité
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-xl p-2.5 transition-all self-start"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border/50 rounded-2xl p-6 sticky top-24 space-y-5">
                <h2 className="text-xl font-black">Résumé</h2>

                <div className="space-y-3 border-b border-border/50 pb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Articles</span>
                    <span className="font-semibold">{items.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total unités</span>
                    <span className="font-semibold">
                      {items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Livraison</span>
                    <span className="font-semibold text-emerald-600">Gratuite</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold">Total HT</span>
                    <span className="text-2xl font-black">
                      {total.toFixed(2)}€
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    TVA calculée à la validation
                  </p>
                </div>

                <div className="space-y-2.5">
                  <Button
                    className="w-full rounded-xl shadow-lg shadow-primary/25"
                    size="lg"
                  >
                    Passer la commande
                  </Button>
                  <Link href="/products">
                    <Button variant="outline" className="w-full rounded-xl">
                      Continuer les achats
                    </Button>
                  </Link>
                  <button
                    onClick={clearCart}
                    className="w-full text-xs text-muted-foreground hover:text-destructive transition-colors py-2"
                  >
                    Vider le panier
                  </button>
                </div>

                {/* Benefits */}
                <div className="bg-secondary/50 rounded-xl p-4 space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                    Avantages inclus
                  </h4>
                  {[
                    { icon: CheckCircle, text: 'Remises volume appliquées' },
                    { icon: Truck, text: 'Livraison express offerte' },
                    { icon: Shield, text: 'Garantie satisfait ou remboursé' },
                    { icon: Package, text: 'Emballage professionnel' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <item.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
