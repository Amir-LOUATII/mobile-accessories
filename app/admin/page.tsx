"use client";

import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { Package, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { StatsGrid } from "@/components/admin/stats-grid";
import { RecentOrdersTable } from "@/components/admin/recent-orders-table";
import { TopProductsTable } from "@/components/admin/top-products-table";

const STATS = [
  {
    label: "Revenu Total",
    value: `$${(125430).toLocaleString()}`,
    icon: TrendingUp,
    color: "text-primary",
  },
  {
    label: "Commandes Totales",
    value: 284,
    icon: ShoppingCart,
    color: "text-blue-500",
  },
  {
    label: "Clients Totaux",
    value: 156,
    icon: Users,
    color: "text-green-500",
  },
  {
    label: "Produits Totaux",
    value: MOCK_PRODUCTS.length,
    icon: Package,
    color: "text-purple-500",
  },
];

const RECENT_ORDERS = [
  { id: "ORD-001", customer: "Acme Corp", amount: 2450, status: "Expédié" },
  {
    id: "ORD-002",
    customer: "TechStart Inc",
    amount: 5200,
    status: "En cours",
  },
  {
    id: "ORD-003",
    customer: "BuildRight LLC",
    amount: 3100,
    status: "En attente",
  },
  {
    id: "ORD-004",
    customer: "Global Supplies",
    amount: 4850,
    status: "Livré",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ── Stats Grid ── */}
      <StatsGrid stats={STATS} />

      {/* ── Recent Orders ── */}
      <RecentOrdersTable orders={RECENT_ORDERS} />

      {/* ── Top Products ── */}
      <TopProductsTable products={MOCK_PRODUCTS.slice(0, 5)} />
    </div>
  );
}
