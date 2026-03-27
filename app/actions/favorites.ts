"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { favorites, products } from "@/lib/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function toggleFavorite(productId: number) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Vous devez être connecté pour ajouter aux favoris." };
  }

  const userId = session.user.id;

  try {
    // Check if it already exists
    const existing = await db.query.favorites.findFirst({
      where: and(
        eq(favorites.userId, userId),
        eq(favorites.productId, productId)
      ),
    });

    if (existing) {
      // Remove it
      await db
        .delete(favorites)
        .where(
          and(
            eq(favorites.userId, userId),
            eq(favorites.productId, productId)
          )
        );
      
      revalidatePath("/favorites");
      revalidatePath("/products");
      return { success: true, isFavorite: false };
    } else {
      // Add it
      await db.insert(favorites).values({
        userId,
        productId,
      });

      revalidatePath("/favorites");
      revalidatePath("/products");
      return { success: true, isFavorite: true };
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return { error: "Une erreur s'est produite." };
  }
}

export async function getUserFavoriteIds() {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  try {
    const userFavorites = await db.query.favorites.findMany({
      where: eq(favorites.userId, session.user.id),
      columns: {
        productId: true,
      },
    });

    return userFavorites.map((f) => f.productId);
  } catch (error) {
    console.error("Error getting favorite IDs:", error);
    return [];
  }
}

export async function getFavoriteProducts(page: number = 1, limit: number = 12) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Non autorisé" };
  }

  try {
    const offset = (page - 1) * limit;

    // Get total count
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(favorites)
      .where(eq(favorites.userId, session.user.id));

    // Fetch products that are in the user's favorites
    const userFavorites = await db.query.favorites.findMany({
      where: eq(favorites.userId, session.user.id),
      with: {
        product: {
          with: {
            category: true,
            wholesalePrices: true,
          }
        }
      },
      orderBy: [desc(favorites.createdAt)],
      limit,
      offset,
    });

    const productsList = userFavorites.map((f) => f.product);
    
    return {
      success: true,
      products: productsList,
      pagination: {
        totalItems: Number(count),
        totalPages: Math.ceil(Number(count) / limit),
        currentPage: page,
        limit,
      },
    };
  } catch (error) {
    console.error("Error getting favorite products:", error);
    return { error: "Erreur lors de la récupération des favoris." };
  }
}
