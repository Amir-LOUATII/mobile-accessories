"use client";

import { useState, useEffect, use } from "react";
import { Header } from "@/components/header";
import { useCart } from "@/lib/cart-context";
import { Product, getWholesalePrice } from "@/lib/mock-data";
import { ProductBreadcrumb } from "@/components/products/product-breadcrumb";
import { ProductImage } from "@/components/products/product-image";
import { ProductDetails } from "@/components/products/product-details";
import { PricingCard } from "@/components/products/pricing-card";
import { WholesaleTiers } from "@/components/products/wholesale-tiers";
import { PurchaseControls } from "@/components/products/purchase-controls";
import { RelatedProducts } from "@/components/products/related-products";
import { Loader2 } from "lucide-react";
import { getProduct, getProducts } from "@/app/actions/products";

interface DBProduct {
  id: number;
  name: string;
  slug: string;
  categoryId: number;
  description: string;
  image: string;
  basePrice: string;
  stock: number;
  minOrder: number;
  badge: string | null;
  category: { id: number; name: string; slug: string };
  wholesalePrices: { id: number; quantity: number; price: string }[];
}

function mapDBProduct(p: DBProduct): Product {
  return {
    id: p.id.toString(),
    name: p.name,
    category: p.category?.name || "—",
    description: p.description,
    image: p.image,
    basePrice: parseFloat(p.basePrice),
    wholesalePrices: (p.wholesalePrices || []).map((wp) => ({
      quantity: wp.quantity,
      price: parseFloat(wp.price),
    })),
    stock: p.stock,
    minOrder: p.minOrder,
    badge: p.badge || undefined,
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setNotFound(false);

    getProduct(id)
      .then((data) => {
        if (!data.product) {
          setNotFound(true);
          return;
        }
        const mapped = mapDBProduct(data.product as DBProduct);
        setProduct(mapped);
        setQuantity(mapped.minOrder);

        // Fetch related products (same category)
        getProducts({ category: mapped.category })
          .then((relData) => {
            const related = ((relData.products as DBProduct[]) || [])
              .filter((p) => p.id.toString() !== id)
              .slice(0, 3)
              .map(mapDBProduct);
            setRelatedProducts(related);
          })
          .catch(() => {});
      })
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Chargement…</span>
        </main>
      </>
    );
  }

  if (notFound || !product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Produit non trouvé</h1>
            <p className="text-muted-foreground">Ce produit n&apos;existe pas ou a été supprimé.</p>
          </div>
        </main>
      </>
    );
  }

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
                <ProductDetails
                  category={product.category}
                  name={product.name}
                  description={product.description}
                  isPlaceholder={false}
                />

                <PricingCard
                  currentPrice={currentPrice}
                  basePrice={product.basePrice}
                  savings={savings}
                  totalPrice={totalPrice}
                  quantity={quantity}
                />

                <WholesaleTiers
                  wholesalePrices={product.wholesalePrices}
                  basePrice={product.basePrice}
                  currentQuantity={quantity}
                />
              </div>

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
