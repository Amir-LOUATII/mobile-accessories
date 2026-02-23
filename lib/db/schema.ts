import {
  pgTable,
  text,
  varchar,
  integer,
  numeric,
  timestamp,
  pgEnum,
  serial,
  jsonb,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ─── Enums ───────────────────────────────────────────────────────────────────

export const userRoleEnum = pgEnum('user_role', ['customer', 'admin']);

export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'confirmed',
  'shipped',
  'delivered',
]);

// ─── Categories ──────────────────────────────────────────────────────────────

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Products ────────────────────────────────────────────────────────────────

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  categoryId: integer('category_id')
    .references(() => categories.id)
    .notNull(),
  description: text('description').notNull(),
  image: text('image').notNull(),
  basePrice: numeric('base_price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull().default(0),
  minOrder: integer('min_order').notNull().default(1),
  badge: varchar('badge', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Wholesale Prices (tier pricing) ─────────────────────────────────────────

export const wholesalePrices = pgTable('wholesale_prices', {
  id: serial('id').primaryKey(),
  productId: integer('product_id')
    .references(() => products.id, { onDelete: 'cascade' })
    .notNull(),
  quantity: integer('quantity').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
});

// ─── Users ───────────────────────────────────────────────────────────────────

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  company: varchar('company', { length: 255 }),
  role: userRoleEnum('role').notNull().default('customer'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Orders ──────────────────────────────────────────────────────────────────

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  total: numeric('total', { precision: 12, scale: 2 }).notNull(),
  status: orderStatusEnum('status').notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Order Items ─────────────────────────────────────────────────────────────

export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id')
    .references(() => orders.id, { onDelete: 'cascade' })
    .notNull(),
  productId: integer('product_id')
    .references(() => products.id)
    .notNull(),
  quantity: integer('quantity').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
});

// ─── Relations ───────────────────────────────────────────────────────────────

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  wholesalePrices: many(wholesalePrices),
  orderItems: many(orderItems),
}));

export const wholesalePricesRelations = relations(wholesalePrices, ({ one }) => ({
  product: one(products, {
    fields: [wholesalePrices.productId],
    references: [products.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

// ─── Type Exports ────────────────────────────────────────────────────────────

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type WholesalePrice = typeof wholesalePrices.$inferSelect;
export type NewWholesalePrice = typeof wholesalePrices.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
