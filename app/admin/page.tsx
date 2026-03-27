import { Package, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { StatsGrid } from "@/components/admin/stats-grid";
import { RecentOrdersTable } from "@/components/admin/recent-orders-table";
import { TopProductsTable } from "@/components/admin/top-products-table";
import { db } from "@/lib/db";
import { orders, users, products, orderItems, categories } from "@/lib/db/schema";
import { sql, eq, desc, gte } from "drizzle-orm";
import { formatPrice } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";

// Make the Admin Dashboard a Server Component to fetch DB safely directly
export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | undefined;
}) {
  const params = await searchParams;
  const ordersPageParam = params?.ordersPage;
  const productsPageParam = params?.productsPage;
  
  const currentOrdersPage = typeof ordersPageParam === 'string' ? parseInt(ordersPageParam, 10) : 1;
  const validOrdersPage = isNaN(currentOrdersPage) || currentOrdersPage < 1 ? 1 : currentOrdersPage;
  
  const currentProductsPage = typeof productsPageParam === 'string' ? parseInt(productsPageParam, 10) : 1;
  const validProductsPage = isNaN(currentProductsPage) || currentProductsPage < 1 ? 1 : currentProductsPage;

  const ITEMS_PER_PAGE = 5;
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

  // 2. Fetch Recent Orders (Paginated)
  const ordersOffset = (validOrdersPage - 1) * ITEMS_PER_PAGE;
  
  const [{ count: totalRecentOrdersCount }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(orders);

  const totalOrdersPages = Math.ceil(Number(totalRecentOrdersCount) / ITEMS_PER_PAGE);

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
    .limit(ITEMS_PER_PAGE)
    .offset(ordersOffset);

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

  // 3. Fetch Most Sold Products This Month (Paginated)
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const productsOffset = (validProductsPage - 1) * ITEMS_PER_PAGE;

  const [{ count: totalTopProductsCount }] = await db
    .select({ count: sql<number>`count(distinct ${products.id})` })
    .from(orderItems)
    .innerJoin(orders, eq(orderItems.orderId, orders.id))
    .innerJoin(products, eq(orderItems.productId, products.id))
    .where(gte(orders.createdAt, startOfMonth));

  const totalProductsPages = Math.ceil(Number(totalTopProductsCount) / ITEMS_PER_PAGE);

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
    .limit(ITEMS_PER_PAGE)
    .offset(productsOffset);

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
      <div>
        <RecentOrdersTable orders={mappedRecentOrders} />
        {totalOrdersPages > 1 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href={`/admin?ordersPage=${validOrdersPage - 1}&productsPage=${validProductsPage}`}
                    className={validOrdersPage <= 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href={`/admin?ordersPage=${validOrdersPage}&productsPage=${validProductsPage}`} isActive>
                    {validOrdersPage} / {totalOrdersPages}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext 
                    href={`/admin?ordersPage=${validOrdersPage + 1}&productsPage=${validProductsPage}`}
                    className={validOrdersPage >= totalOrdersPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* ── Top Products ── */}
      <div>
        <TopProductsTable products={mappedTopProducts} />
        {totalProductsPages > 1 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href={`/admin?ordersPage=${validOrdersPage}&productsPage=${validProductsPage - 1}`}
                    className={validProductsPage <= 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href={`/admin?ordersPage=${validOrdersPage}&productsPage=${validProductsPage}`} isActive>
                    {validProductsPage} / {totalProductsPages}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext 
                    href={`/admin?ordersPage=${validOrdersPage}&productsPage=${validProductsPage + 1}`}
                    className={validProductsPage >= totalProductsPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
