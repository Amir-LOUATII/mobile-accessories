"use client";

import { MiniStats } from "@/components/admin/mini-stats";
import { OrdersTable } from "@/components/admin/orders-table";

const ORDERS = [
  {
    id: "ORD-001",
    customer: "Acme Corp",
    email: "orders@acme.com",
    items: 45,
    total: 2450,
    status: "Expédié",
    date: "2024-02-15",
  },
  {
    id: "ORD-002",
    customer: "TechStart Inc",
    email: "sales@techstart.com",
    items: 120,
    total: 5200,
    status: "En cours",
    date: "2024-02-14",
  },
  {
    id: "ORD-003",
    customer: "BuildRight LLC",
    email: "procurement@buildright.com",
    items: 35,
    total: 3100,
    status: "En attente",
    date: "2024-02-14",
  },
  {
    id: "ORD-004",
    customer: "Global Supplies",
    email: "orders@globalsupplies.com",
    items: 200,
    total: 4850,
    status: "Livré",
    date: "2024-02-13",
  },
  {
    id: "ORD-005",
    customer: "Premium Retail",
    email: "wholesale@premiumretail.com",
    items: 150,
    total: 6200,
    status: "Livré",
    date: "2024-02-12",
  },
];

export default function AdminOrdersPage() {
  const miniStats = [
    { label: "Commandes Totales", value: ORDERS.length },
    {
      label: "En attente",
      value: ORDERS.filter((o) => o.status === "En attente").length,
      color: "text-yellow-600",
    },
    {
      label: "Expédié",
      value: ORDERS.filter((o) => o.status === "Expédié").length,
      color: "text-blue-600",
    },
    {
      label: "Revenu Total",
      value: `$${ORDERS.reduce((sum, o) => sum + o.total, 0).toLocaleString()}`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <h1 className="text-2xl sm:text-3xl font-bold">
        Gestion des Commandes
      </h1>

      {/* ── Stats ── */}
      <MiniStats stats={miniStats} columns={4} />

      {/* ── Orders Table ── */}
      <OrdersTable orders={ORDERS} />
    </div>
  );
}
