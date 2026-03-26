"use server";

import { db } from "@/lib/db";
import { orders, users, orderItems } from "@/lib/db/schema";
import { desc, eq, ilike, or, and, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function createOrder(data: {
  items: { productId: string; quantity: number; price: number }[];
  total: number;
}) {
  try {
    const session = await auth();
    // Verify authentication and role
    if (!session?.user || (session.user.role !== "seller" && session.user.role !== "admin")) {
      return { error: "Non autorisé à passer une commande. Veuillez vous connecter." };
    }

    const userId = session.user.id;
    if (!userId) {
      return { error: "Utilisateur non trouvé" };
    }

    // 1. Insert the parent order
    const [newOrder] = await db
      .insert(orders)
      .values({
        userId,
        total: data.total.toString(),
        status: "pending",
      })
      .returning({ id: orders.id });

    // 2. Prepare order items
    const insertItems = data.items.map((item) => ({
      orderId: newOrder.id,
      productId: parseInt(item.productId, 10),
      quantity: item.quantity,
      price: item.price.toString(),
    }));

    // 3. Bulk insert items
    await db.insert(orderItems).values(insertItems);

    return { success: true, orderId: newOrder.id };
  } catch (error: any) {
    console.error("Erreur createOrder:", error);
    return { error: "Erreur lors de la création de la commande." };
  }
}

export async function getAdminOrders(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return { error: "Non autorisé" };
    }

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const search = params?.search || "";
    const statusFilter = params?.status || "all";

    const conditions = [];

    // Filter by status if provided & not "all"
    if (statusFilter && statusFilter !== "all") {
      conditions.push(eq(orders.status, statusFilter as any));
    }

    // Build the query
    let query = db
      .select({
        id: orders.id,
        status: orders.status,
        total: orders.total,
        createdAt: orders.createdAt,
        userName: users.name,
        userEmail: users.email,
        userCompany: users.company,
        // We can aggregate total items if we array_agg or just query it in a separate step or a join
        // For simplicity and to avoid complex group_by issues in some dialects, 
        // we'll pull the relations via db.query below.
      })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id));

    if (search) {
      conditions.push(
        or(
          ilike(users.name, `%${search}%`),
          ilike(users.email, `%${search}%`),
          ilike(users.company, `%${search}%`),
          // Cast order id to text to search by id
          sql`CAST(${orders.id} AS TEXT) ILIKE ${`%${search}%`}`
        )!
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // To get the total count for pagination:
    const countQuery = await db
      .select({ count: sql<number>`count(*)` })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .where(whereClause);

    const totalItems = Number(countQuery[0].count);
    const totalPages = Math.ceil(totalItems / limit) || 1;

    // Get the actual items using db.query for nested relations
    // However, db.query API does not easily support filtering nested relations on the parent level (like ILIKE on users.name)
    // So we fetch the IDs first, then use db.query, OR we map the grouped query result.

    // Let's use db.query and pass the IDs we found through the join.
    const matchingOrderIds = await db
      .select({ id: orders.id })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .where(whereClause)
      .orderBy(desc(orders.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    const ids = matchingOrderIds.map(o => o.id);

    let resultOrders: any[] = [];
    
    if (ids.length > 0) {
      resultOrders = await db.query.orders.findMany({
        where: (order, { inArray }) => inArray(order.id, ids),
        with: {
          user: {
            columns: {
              name: true,
              email: true,
              company: true,
            }
          },
          items: true,
        },
        orderBy: [desc(orders.createdAt)],
      });
    }

    return {
      orders: resultOrders,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        limit,
      },
      stats: {
        totalRevenue: 0, // Optionally calculate real stats later
      }
    };
  } catch (error: any) {
    console.error("Erreur getAdminOrders:", error);
    return { error: "Erreur lors de la récupération des commandes" };
  }
}

export async function getOrderById(orderId: number) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return { error: "Non autorisé" };
    }

    const order = await db.query.orders.findFirst({
      where: eq(orders.id, orderId),
      with: {
        user: {
          columns: {
            name: true,
            email: true,
            company: true,
          }
        },
        items: {
          with: {
            product: {
              columns: {
                name: true,
                image: true,
              }
            }
          }
        }
      }
    });

    if (!order) return { error: "Commande introuvable" };
    return { order };
  } catch (error: any) {
    console.error("Erreur getOrderById:", error);
    return { error: "Erreur lors de la récupération de la commande" };
  }
}

export async function updateOrderStatus(orderId: number, status: string) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return { error: "Non autorisé" };
    }

    await db.update(orders)
      .set({ status: status as any })
      .where(eq(orders.id, orderId));

    return { success: true };
  } catch (error: any) {
    console.error("Erreur updateOrderStatus:", error);
    return { error: "Erreur lors de la mise à jour du statut" };
  }
}
