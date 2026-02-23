"use client";

import { useCart } from "@/lib/cart-context";
import { Header } from "@/components/header";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { EmptyCart } from "@/components/cart/empty-cart";
import { CartHeader } from "@/components/cart/cart-header";
import { CartItemCard } from "@/components/cart/cart-item";
import { OrderSummary } from "@/components/cart/order-summary";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background">
          <EmptyCart />
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-14">
          {/* ── Cart Header ── */}
          <CartHeader itemCount={items.length} />

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* ── Cart Items ── */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {items.map((item) => {
                const product = MOCK_PRODUCTS.find(
                  (p) => p.id === item.productId
                );
                if (!product) return null;

                return (
                  <CartItemCard
                    key={item.productId}
                    productId={item.productId}
                    name={product.name}
                    category={product.category}
                    image={product.image}
                    quantity={item.quantity}
                    unitPrice={item.price}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                );
              })}
            </div>

            {/* ── Order Summary ── */}
            <OrderSummary
              items={items}
              total={total}
              onClearCart={clearCart}
            />
          </div>
        </div>
      </main>
    </>
  );
}
