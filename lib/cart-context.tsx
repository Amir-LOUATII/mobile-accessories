'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, MOCK_PRODUCTS, getWholesalePrice } from './mock-data';

interface CartState {
  items: CartItem[];
  addItem: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

// Helper to recompute derived values
function computeDerived(items: CartItem[]) {
  return {
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  };
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,

      addItem: (productId: string, quantity: number) => {
        const product = MOCK_PRODUCTS.find((p) => p.id === productId);
        if (!product) return;

        const wholesalePrice = getWholesalePrice(product, quantity);
        const prev = get().items;
        const existing = prev.find((item) => item.productId === productId);

        let nextItems: CartItem[];
        if (existing) {
          nextItems = prev.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity, price: wholesalePrice }
              : item
          );
        } else {
          nextItems = [...prev, { productId, quantity, price: wholesalePrice }];
        }

        set({ items: nextItems, ...computeDerived(nextItems) });
      },

      removeItem: (productId: string) => {
        const nextItems = get().items.filter((item) => item.productId !== productId);
        set({ items: nextItems, ...computeDerived(nextItems) });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const product = MOCK_PRODUCTS.find((p) => p.id === productId);
        if (!product) return;

        const wholesalePrice = getWholesalePrice(product, quantity);
        const nextItems = get().items.map((item) =>
          item.productId === productId
            ? { ...item, quantity, price: wholesalePrice }
            : item
        );

        set({ items: nextItems, ...computeDerived(nextItems) });
      },

      clearCart: () => {
        set({ items: [], total: 0, itemCount: 0 });
      },
    }),
    {
      name: 'cart',
    }
  )
);

// ── Backward-compatible CartProvider (no-op wrapper) ──
// Keeps the layout.tsx import working without changes.
export function CartProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
