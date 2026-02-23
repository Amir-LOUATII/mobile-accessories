import { db } from './index';
import { eq, desc, asc, sql } from 'drizzle-orm';
import {
  products,
  categories,
  wholesalePrices,
  users,
  orders,
  orderItems,
  type Product,
} from './schema';

// ─── Product Queries ─────────────────────────────────────────────────────────

/**
 * Get all products with their category and wholesale price tiers.
 */
export async function getAllProducts() {
  return db.query.products.findMany({
    with: {
      category: true,
      wholesalePrices: {
        orderBy: [asc(wholesalePrices.quantity)],
      },
    },
    orderBy: [desc(products.createdAt)],
  });
}

/**
 * Get a single product by its ID with full relations.
 */
export async function getProductById(id: number) {
  return db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      category: true,
      wholesalePrices: {
        orderBy: [asc(wholesalePrices.quantity)],
      },
    },
  });
}

/**
 * Get a single product by its slug with full relations.
 */
export async function getProductBySlug(slug: string) {
  return db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: {
      category: true,
      wholesalePrices: {
        orderBy: [asc(wholesalePrices.quantity)],
      },
    },
  });
}

/**
 * Get products filtered by category slug.
 */
export async function getProductsByCategory(categorySlug: string) {
  const category = await db.query.categories.findFirst({
    where: eq(categories.slug, categorySlug),
  });

  if (!category) return [];

  return db.query.products.findMany({
    where: eq(products.categoryId, category.id),
    with: {
      category: true,
      wholesalePrices: {
        orderBy: [asc(wholesalePrices.quantity)],
      },
    },
    orderBy: [desc(products.createdAt)],
  });
}

// ─── Category Queries ────────────────────────────────────────────────────────

/**
 * Get all categories with product count.
 */
export async function getAllCategories() {
  return db.query.categories.findMany({
    orderBy: [asc(categories.name)],
  });
}

// ─── User Queries ────────────────────────────────────────────────────────────

/**
 * Get a user by email.
 */
export async function getUserByEmail(email: string) {
  return db.query.users.findFirst({
    where: eq(users.email, email),
  });
}

// ─── Order Queries ───────────────────────────────────────────────────────────

/**
 * Get all orders for a specific user with items.
 */
export async function getOrdersByUserId(userId: string) {
  return db.query.orders.findMany({
    where: eq(orders.userId, userId),
    with: {
      items: {
        with: {
          product: true,
        },
      },
    },
    orderBy: [desc(orders.createdAt)],
  });
}

// ─── Wholesale Price Helper ──────────────────────────────────────────────────

/**
 * Calculate the wholesale price for a product given a quantity.
 * Mirrors the logic from mock-data.ts but works with DB data.
 */
export function calculateWholesalePrice(
  basePrice: string,
  tiers: { quantity: number; price: string }[],
  quantity: number
): number {
  let price = parseFloat(basePrice);

  // Tiers should already be sorted by quantity ascending
  for (let i = tiers.length - 1; i >= 0; i--) {
    if (quantity >= tiers[i].quantity) {
      price = parseFloat(tiers[i].price);
      break;
    }
  }

  return price;
}
