"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { MOCK_PRODUCTS, getWholesalePrice, FALLBACK_IMAGE } from "@/lib/mock-data";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Plus,
  Minus,
  Truck,
  Shield,
  Clock,
  ShoppingCart,
  Check,
  Package,
  Star,
  ChevronRight,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const foundProduct = MOCK_PRODUCTS.find((p) => p.id === id);

  const product = foundProduct ?? {
    id: "placeholder",
    name: "Produit Démonstration",
    description:
      "Ceci est un produit temporaire utilisé pour prévisualiser le design. Les données finales seront mises à jour prochainement.",
    image: "https://via.placeholder.com/800x800.png?text=Produit",
    category: "Catégorie",
    basePrice: 99,
    minOrder: 1,
    stock: 25,
    wholesalePrices: [
      { quantity: 1, price: 99 },
      { quantity: 10, price: 89 },
      { quantity: 50, price: 79 },
    ],
  };

  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(product.minOrder);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imgError, setImgError] = useState(false);

  const currentPrice = getWholesalePrice(product, quantity);
  const savings = (
    ((product.basePrice - currentPrice) / product.basePrice) *
    100
  ).toFixed(0);
  const totalPrice = currentPrice * quantity;

  const handleAddToCart = () => {
    addItem(product.id, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const incrementQuantity = () => setQuantity((q) => q + 1);

  const decrementQuantity = () => {
    if (quantity > product.minOrder) {
      setQuantity((q) => q - 1);
    }
  };

  // Get related products from same category
  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <section className="border-b border-border/50 bg-card/30">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link
                href="/"
                className="hover:text-primary transition-colors duration-200"
              >
                Accueil
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link
                href="/products"
                className="hover:text-primary transition-colors duration-200"
              >
                Produits
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground font-medium truncate max-w-[200px]">
                {product.name}
              </span>
            </div>
          </div>
        </section>

        {/* Product */}
        <section className="py-8 md:py-12 px-4 md:px-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Image */}
            <div className="space-y-4">
              <div className="relative w-full aspect-square bg-gradient-to-br from-secondary to-muted rounded-2xl overflow-hidden group">
                <Image
                  src={imgError ? FALLBACK_IMAGE : product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={() => setImgError(true)}
                />

                {/* Stock Badge */}
                {product.stock === 0 && (
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

            {/* Details */}
            <div className="flex flex-col">
              <div className="space-y-6 flex-1">
                {/* Category & Badge */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary/70">
                    {product.category}
                  </span>
                  {product.id === "placeholder" && (
                    <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-muted text-muted-foreground">
                      Démonstration
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                  {product.name}
                </h1>

                {/* Rating Placeholder */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < 4 ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    4.0 (127 avis)
                  </span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Pricing Card */}
                <div className="bg-gradient-to-br from-card to-secondary/30 border border-border/50 rounded-2xl p-6 space-y-4">
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-extrabold">
                      {currentPrice.toFixed(2)}€
                    </span>
                    {currentPrice < product.basePrice && (
                      <span className="text-lg text-muted-foreground line-through mb-1">
                        {product.basePrice.toFixed(2)}€
                      </span>
                    )}
                    <span className="text-muted-foreground text-sm mb-1">/unité</span>
                  </div>

                  {savings !== "0" && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-sm font-semibold">
                      <span>🎉</span> Économie de {savings}%
                    </div>
                  )}

                  <div className="text-sm text-muted-foreground">
                    Total: <span className="font-bold text-foreground">{totalPrice.toFixed(2)}€</span> pour {quantity} unités
                  </div>
                </div>

                {/* Wholesale Tiers */}
                <div>
                  <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-foreground/70">
                    Tarification dégressive
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {product.wholesalePrices.map((tier, idx) => (
                      <div
                        key={idx}
                        className={`border rounded-xl p-3 text-center transition-all duration-300 ${
                          quantity >= tier.quantity
                            ? "border-primary/40 bg-primary/5 shadow-sm"
                            : "border-border/50 bg-card"
                        }`}
                      >
                        <p className="text-xs text-muted-foreground mb-1">
                          {tier.quantity}+ unités
                        </p>
                        <p className={`text-lg font-extrabold ${
                          quantity >= tier.quantity ? "text-primary" : ""
                        }`}>
                          {tier.price.toFixed(2)}€
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          -{(((product.basePrice - tier.price) / product.basePrice) * 100).toFixed(0)}%
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Purchase Controls */}
              <div className="space-y-4 mt-8 pt-6 border-t border-border/50">
                {/* Quantity */}
                <div>
                  <label className="text-sm font-bold block mb-2">
                    Quantité
                  </label>
                  <div className="flex items-center border border-border/60 rounded-xl p-1.5 bg-secondary/30">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity === product.minOrder}
                      className="p-2.5 disabled:opacity-30 hover:bg-card rounded-lg transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      min={product.minOrder}
                      onChange={(e) => {
                        const val = Math.max(
                          product.minOrder,
                          parseInt(e.target.value) || product.minOrder
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
                    Commande minimale: {product.minOrder} unités
                  </p>
                </div>

                {/* Stock indicator */}
                <div className="flex items-center gap-2">
                  {product.stock === 0 ? (
                    <span className="text-destructive text-sm font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-destructive" />
                      Rupture de stock
                    </span>
                  ) : product.stock > 100 ? (
                    <span className="text-emerald-600 text-sm font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      En stock ({product.stock} unités)
                    </span>
                  ) : (
                    <span className="text-amber-600 text-sm font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse-soft" />
                      Stock limité: {product.stock} unités
                    </span>
                  )}
                </div>

                {/* Buttons */}
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="w-full rounded-xl gap-2 text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                  disabled={product.stock === 0}
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
                      Ajouter au panier — {totalPrice.toFixed(2)}€
                    </>
                  )}
                </Button>

                <Link href="/cart">
                  <Button
                    variant="outline"
                    className="w-full rounded-xl"
                    size="lg"
                  >
                    Voir le panier
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-border/50 bg-secondary/20 py-12 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-xl font-bold mb-6">Produits similaires</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {relatedProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    className="group flex gap-4 bg-card border border-border/50 rounded-2xl p-4 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        À partir de
                      </p>
                      <p className="text-base font-extrabold mt-0.5">
                        {p.basePrice.toFixed(2)}€
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
