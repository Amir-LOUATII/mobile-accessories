import { Package, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { StatsGrid } from "@/components/admin/stats-grid";
import { RecentOrdersTable } from "@/components/admin/recent-orders-table";
import { TopProductsTable } from "@/components/admin/top-products-table";
import { db } from "@/lib/db";
import { orders, users, products, orderItems, categories } from "@/lib/db/schema";
import { sql, eq, desc, gte } from "drizzle-orm";
import { formatPrice } from "@/lib/utils";

// Make the Admin Dashboard a Server Component to fetch DB safely directly
export default async function AdminDashboard() {
  // 1. Fetch KPI metrics from database
  const [{ totalOrders }] = await db.select({ totalOrders: sql<number>`count(*)` }).from(orders);
  
  const [{ totalCustomers }] = await db
    .select({ totalCustomers: sql<number>`count(*)` })
    .from(users);
    
  const [{ totalProducts }] = await db.select({ totalProducts: sql<number>`count(*)` }).from(products);
  
  const [{ totalRevenueStr }] = await db.select({ totalRevenueStr: sql<string>`sum(${orders.total})` }).from(orders);
  
  const totalRevenue = Number(totalRevenueStr) || 0;

  const statsCards = [
    {
      label: "Revenu Total",
      value: formatPrice(totalRevenue),
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      label: "Commandes Totales",
      value: Number(totalOrders),
      icon: ShoppingCart,
      color: "text-blue-500",
    },
    {
      label: "Clients Totaux",
      value: Number(totalCustomers),
      icon: Users,
      color: "text-green-500",
    },
    {
      label: "Produits Totaux",
      value: Number(totalProducts),
      icon: Package,
      color: "text-purple-500",
    },
  ];

  // 2. Fetch Recent Orders (Last 5)
  const recentOrdersRaw = await db
    .select({
      id: orders.id,
      amount: orders.total,
      status: orders.status,
      customerName: users.name,
    })
    .from(orders)
    .innerJoin(users, eq(orders.userId, users.id))
    .orderBy(desc(orders.createdAt))
    .limit(5);

  const STATUS_MAP: Record<string, string> = {
    pending: "En attente",
    confirmed: "En cours",
    shipped: "Expédié",
    delivered: "Livré",
  };

  const mappedRecentOrders = recentOrdersRaw.map((order) => ({
    rawId: order.id,
    id: `ORD-${order.id.toString().padStart(3, "0")}`,
    customer: order.customerName || "Anonyme",
    amount: Number(order.amount),
    status: STATUS_MAP[order.status] || order.status, 
  }));

  // 3. Fetch Most Sold Products This Month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const topProductsRaw = await db
    .select({
      id: products.id,
      name: products.name,
      stock: products.stock,
      basePrice: products.basePrice,
      image: products.image,
      categoryName: categories.name,
      totalQuantity: sql<number>`coalesce(sum(${orderItems.quantity}), 0)`,
    })
    .from(orderItems)
    .innerJoin(orders, eq(orderItems.orderId, orders.id))
    .innerJoin(products, eq(orderItems.productId, products.id))
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(gte(orders.createdAt, startOfMonth))
    .groupBy(products.id, categories.name)
    .orderBy(desc(sql`sum(${orderItems.quantity})`))
    .limit(5);

  const mappedTopProducts = topProductsRaw.map((p) => ({
    id: p.id.toString(),
    name: p.name,
    category: p.categoryName || "—",
    description: "", // Mock fallback for table that doesn't display it anyway
    image: p.image,
    basePrice: Number(p.basePrice),
    wholesalePrices: [],
    stock: p.stock,
    minOrder: 1,
  }));

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ── Stats Grid ── */}
      <StatsGrid stats={statsCards} />

      {/* ── Recent Orders ── */}
      <RecentOrdersTable orders={mappedRecentOrders} />

      {/* ── Top Products ── */}
      <TopProductsTable products={mappedTopProducts} />
    </div>
  );
}
