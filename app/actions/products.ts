"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { products, wholesalePrices, categories } from "@/lib/db/schema";
import { eq, desc, asc, ilike, and, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// ── GET CATEGORIES ──
export async function getCategories() {
  try {
    const cats = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        productCount: sql<number>`count(${products.id})::int`,
      })
      .from(categories)
      .leftJoin(products, eq(products.categoryId, categories.id))
      .groupBy(categories.id)
      .orderBy(asc(categories.name));

    return { categories: cats };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { error: "Failed to fetch categories" };
  }
}

// ── GET PRODUCTS (with filters) ──
export async function getProducts({
  category,
  search,
  sort,
}: {
  category?: string;
  search?: string;
  sort?: string;
} = {}) {
  try {
    const conditions = [];

    if (category && category !== "Tous") {
      const cat = await db.query.categories.findFirst({
        where: eq(categories.name, category),
      });
      if (cat) {
        conditions.push(eq(products.categoryId, cat.id));
      }
    }

    if (search) {
      conditions.push(ilike(products.name, `%${search}%`));
    }

    let orderByClause;
    switch (sort) {
      case "price-low":
        orderByClause = [asc(products.basePrice)];
        break;
      case "price-high":
        orderByClause = [desc(products.basePrice)];
        break;
      case "name":
        orderByClause = [asc(products.name)];
        break;
      default:
        orderByClause = [desc(products.createdAt)];
    }

    const results = await db.query.products.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      with: {
        category: true,
        wholesalePrices: {
          orderBy: [asc(wholesalePrices.quantity)],
        },
      },
      orderBy: orderByClause,
    });

    return { products: results };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { error: "Failed to fetch products" };
  }
}

// ── GET SINGLE PRODUCT ──
export async function getProduct(id: number | string) {
  try {
    const productId = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(productId)) return { error: "ID invalide" };

    const product = await db.query.products.findFirst({
      where: eq(products.id, productId),
      with: {
        category: true,
        wholesalePrices: {
          orderBy: [asc(wholesalePrices.quantity)],
        },
      },
    });

    if (!product) return { error: "Produit non trouvé" };
    return { product };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { error: "Failed to fetch product" };
  }
}

// ── CREATE PRODUCT ──
export async function createProduct(data: any) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return { error: "Non autorisé" };
    }

    const { name, categoryId, description, image, basePrice, stock, minOrder, badge, tiers } = data;

    if (!name || !categoryId || !description || !basePrice) {
      return { error: "Nom, catégorie, description et prix sont requis" };
    }

    const slug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") +
      "-" +
      Date.now().toString(36);

    const [newProduct] = await db
      .insert(products)
      .values({
        name,
        slug,
        categoryId: parseInt(categoryId, 10),
        description,
        image: image || "/fallback-product.svg",
        basePrice: basePrice.toString(),
        stock: parseInt(stock, 10) || 0,
        minOrder: parseInt(minOrder, 10) || 1,
        badge: badge || null,
      })
      .returning();

    if (tiers && Array.isArray(tiers)) {
      const validTiers = tiers.filter((t) => t.quantity && t.price);
      if (validTiers.length > 0) {
        await db.insert(wholesalePrices).values(
          validTiers.map((t) => ({
            productId: newProduct.id,
            quantity: parseInt(t.quantity, 10),
            price: t.price.toString(),
          }))
        );
      }
    }

    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true, product: newProduct };
  } catch (error) {
    console.error("Error creating product:", error);
    return { error: "Failed to create product" };
  }
}

// ── UPDATE PRODUCT ──
export async function updateProduct(id: number | string, data: any) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return { error: "Non autorisé" };
    }

    const productId = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(productId)) return { error: "ID invalide" };

    const { name, categoryId, description, image, basePrice, stock, minOrder, badge, tiers } = data;

    const [updated] = await db
      .update(products)
      .set({
        ...(name && { name }),
        ...(categoryId && { categoryId: parseInt(categoryId, 10) }),
        ...(description !== undefined && { description }),
        ...(image !== undefined && { image }),
        ...(basePrice !== undefined && { basePrice: basePrice.toString() }),
        ...(stock !== undefined && { stock: parseInt(stock, 10) }),
        ...(minOrder !== undefined && { minOrder: parseInt(minOrder, 10) }),
        ...(badge !== undefined && { badge: badge || null }),
        updatedAt: new Date(),
      })
      .where(eq(products.id, productId))
      .returning();

    if (!updated) return { error: "Produit non trouvé" };

    if (tiers && Array.isArray(tiers)) {
      await db.delete(wholesalePrices).where(eq(wholesalePrices.productId, productId));
      const validTiers = tiers.filter((t) => t.quantity && t.price);
      if (validTiers.length > 0) {
        await db.insert(wholesalePrices).values(
          validTiers.map((t) => ({
            productId,
            quantity: parseInt(t.quantity, 10),
            price: t.price.toString(),
          }))
        );
      }
    }

    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath(`/products/${productId}`);
    return { success: true, product: updated };
  } catch (error) {
    console.error("Error updating product:", error);
    return { error: "Failed to update product" };
  }
}

// ── DELETE PRODUCT ──
export async function deleteProduct(id: number | string) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return { error: "Non autorisé" };
    }

    const productId = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(productId)) return { error: "ID invalide" };

    const [deleted] = await db
      .delete(products)
      .where(eq(products.id, productId))
      .returning();

    if (!deleted) return { error: "Produit non trouvé" };

    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { error: "Failed to delete product" };
  }
}
