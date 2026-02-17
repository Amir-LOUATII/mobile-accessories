"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { MOCK_PRODUCTS, getWholesalePrice } from "@/lib/mock-data";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Minus, Truck, Shield, Clock } from "lucide-react";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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

  const currentPrice = getWholesalePrice(product, quantity);
  const savings = (
    ((product.basePrice - currentPrice) / product.basePrice) *
    100
  ).toFixed(0);

  const handleAddToCart = () => {
    addItem(product.id, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const incrementQuantity = () => setQuantity((q) => q + 1);

  const decrementQuantity = () => {
    if (quantity > product.minOrder) {
      setQuantity((q) => q - 1);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Back Link */}
        <section className="border-b border-border py-4 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/products"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux produits
            </Link>
          </div>
        </section>

        {/* Product */}
        <section className="py-10 px-4 md:px-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative w-full h-96 bg-muted rounded-2xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                crossOrigin="anonymous"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {product.category}
                  </p>

                  <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                    {product.name}
                  </h1>

                  {product.id === "placeholder" && (
                    <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                      Produit de démonstration
                    </span>
                  )}

                  <p className="mt-4 text-muted-foreground">
                    {product.description}
                  </p>
                </div>

                {/* Pricing */}
                <div className="border border-border rounded-2xl p-6 space-y-3 bg-card">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold">
                      ${currentPrice.toFixed(2)}
                    </span>

                    {currentPrice < product.basePrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${product.basePrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Quantité sélectionnée: {quantity}
                  </p>

                  {savings !== "0" && (
                    <p className="text-sm font-medium">
                      Économie de {savings}%
                    </p>
                  )}
                </div>

                {/* Wholesale */}
                <div>
                  <h3 className="font-semibold mb-3">Tarification en gros</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {product.wholesalePrices.map((tier, idx) => (
                      <div
                        key={idx}
                        className="border border-border rounded-xl p-3 text-sm"
                      >
                        <p className="text-muted-foreground">
                          {tier.quantity}+ unités
                        </p>
                        <p className="font-semibold">
                          ${tier.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
                  <div className="flex flex-col items-center text-center gap-2 text-sm">
                    <Truck className="w-5 h-5" />
                    Livraison rapide
                  </div>
                  <div className="flex flex-col items-center text-center gap-2 text-sm">
                    <Shield className="w-5 h-5" />
                    Qualité garantie
                  </div>
                  <div className="flex flex-col items-center text-center gap-2 text-sm">
                    <Clock className="w-5 h-5" />
                    Support 24/7
                  </div>
                </div>
              </div>

              {/* Purchase */}
              <div className="space-y-4 mt-10">
                <div>
                  <label className="text-sm font-medium block mb-2">
                    Quantité
                  </label>

                  <div className="flex items-center border border-border rounded-xl p-2">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity === product.minOrder}
                      className="p-2 disabled:opacity-40"
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
                          parseInt(e.target.value) || product.minOrder,
                        );
                        setQuantity(val);
                      }}
                      className="flex-1 text-center bg-transparent outline-none"
                    />

                    <button onClick={incrementQuantity} className="p-2">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground mt-2">
                    Commande minimale: {product.minOrder}
                  </p>
                </div>

                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="w-full rounded-xl"
                >
                  {addedToCart ? "✓ Ajouté au panier" : "Ajouter au panier"}
                </Button>

                <Link href="/cart">
                  <Button variant="outline" className="w-full rounded-xl">
                    Voir le panier
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
