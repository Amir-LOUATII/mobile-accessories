'use client';

import { useCart } from '@/lib/cart-context';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center space-y-6">
              <h1 className="text-4xl font-bold">Votre Panier est Vide</h1>
              <p className="text-lg text-foreground/70">
                Commencez à ajouter des produits à votre panier pour les voir ici.
              </p>
              <Link href="/products">
                <Button size="lg" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Continuer les Achats
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Panier d'Achat</h1>
            <p className="text-foreground/70">Vérifiez vos articles et procédez au paiement</p>
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
                    className="border border-border rounded-lg p-4 flex gap-4 hover:shadow-md transition"
                  >
                    {/* Product Image */}
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-secondary">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        crossOrigin="anonymous"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg">{product.name}</h3>
                        <p className="text-sm text-foreground/60">{product.category}</p>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 border border-border rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-1 hover:bg-secondary rounded transition"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-1 hover:bg-secondary rounded transition"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="font-bold text-lg">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-foreground/60">
                            @ ${item.price.toFixed(2)} chacun
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-destructive hover:bg-destructive/10 rounded-lg p-2 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-border rounded-lg p-6 sticky top-24 space-y-4">
                <h2 className="text-2xl font-bold">Résumé de la Commande</h2>

                <div className="space-y-3 border-b border-border pb-4">
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Articles:</span>
                    <span className="font-semibold">{items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Total d'unités:</span>
                    <span className="font-semibold">
                      {items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Sous-total:</span>
                    <span className="font-bold text-primary">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/60">
                    Frais de port et taxes calculés à la caisse
                  </p>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" size="lg">
                    Procéder au Paiement
                  </Button>
                  <Link href="/products">
                    <Button variant="outline" className="w-full">
                      Continuer les Achats
                    </Button>
                  </Link>
                  <button
                    onClick={clearCart}
                    className="w-full text-sm text-destructive hover:text-destructive/80 transition"
                  >
                    Vider le Panier
                  </button>
                </div>

                {/* Wholesale Benefits */}
                <div className="bg-secondary rounded-lg p-4 text-sm space-y-2">
                  <h3 className="font-semibold">Avantages en Gros</h3>
                  <ul className="text-foreground/70 space-y-1">
                    <li>✓ Remises de volume appliquées</li>
                    <li>✓ Support de commandes en gros</li>
                    <li>✓ Expédition prioritaire</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
