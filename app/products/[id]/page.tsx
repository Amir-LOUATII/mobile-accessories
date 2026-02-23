"use client";

import { useState, use } from "react";
import { Header } from "@/components/header";
import { MOCK_PRODUCTS, getWholesalePrice } from "@/lib/mock-data";
import { useCart } from "@/lib/cart-context";
import { ProductBreadcrumb } from "@/components/products/product-breadcrumb";
import { ProductImage } from "@/components/products/product-image";
import { ProductDetails } from "@/components/products/product-details";
import { PricingCard } from "@/components/products/pricing-card";
import { WholesaleTiers } from "@/components/products/wholesale-tiers";
import { PurchaseControls } from "@/components/products/purchase-controls";
import { RelatedProducts } from "@/components/products/related-products";

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

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* ── Breadcrumb ── */}
        <ProductBreadcrumb productName={product.name} />

        {/* ── Product Section ── */}
        <section className="py-8 md:py-12 px-4 md:px-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14">
            {/* ── Image ── */}
            <ProductImage
              image={product.image}
              name={product.name}
              stock={product.stock}
              imgError={imgError}
              setImgError={setImgError}
            />

            {/* ── Details Column ── */}
            <div className="flex flex-col">
              <div className="space-y-6 flex-1">
                {/* ── Product Details ── */}
                <ProductDetails
                  category={product.category}
                  name={product.name}
                  description={product.description}
                  isPlaceholder={product.id === "placeholder"}
                />

                {/* ── Pricing Card ── */}
                <PricingCard
                  currentPrice={currentPrice}
                  basePrice={product.basePrice}
                  savings={savings}
                  totalPrice={totalPrice}
                  quantity={quantity}
                />

                {/* ── Wholesale Tiers ── */}
                <WholesaleTiers
                  wholesalePrices={product.wholesalePrices}
                  basePrice={product.basePrice}
                  currentQuantity={quantity}
                />
              </div>

              {/* ── Purchase Controls ── */}
              <PurchaseControls
                quantity={quantity}
                setQuantity={setQuantity}
                minOrder={product.minOrder}
                stock={product.stock}
                addedToCart={addedToCart}
                onAddToCart={handleAddToCart}
                totalPrice={totalPrice}
              />
            </div>
          </div>
        </section>

        {/* ── Related Products ── */}
        <RelatedProducts products={relatedProducts} />
      </main>
    </>
  );
}
