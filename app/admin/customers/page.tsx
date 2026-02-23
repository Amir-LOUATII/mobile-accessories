"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MiniStats } from "@/components/admin/mini-stats";
import { CustomersTable } from "@/components/admin/customers-table";

const CUSTOMERS = [
  {
    id: "CUST-001",
    name: "John Smith",
    company: "Acme Corp",
    email: "john@acme.com",
    phone: "(555) 123-4567",
    orders: 12,
    totalSpent: 24500,
    joinDate: "2023-06-15",
    status: "Actif",
  },
  {
    id: "CUST-002",
    name: "Sarah Johnson",
    company: "TechStart Inc",
    email: "sarah@techstart.com",
    phone: "(555) 234-5678",
    orders: 8,
    totalSpent: 18200,
    joinDate: "2023-09-20",
    status: "Actif",
  },
  {
    id: "CUST-003",
    name: "Michael Chen",
    company: "BuildRight LLC",
    email: "michael@buildright.com",
    phone: "(555) 345-6789",
    orders: 15,
    totalSpent: 32100,
    joinDate: "2023-03-10",
    status: "Actif",
  },
  {
    id: "CUST-004",
    name: "Emily Rodriguez",
    company: "Global Supplies",
    email: "emily@globalsupplies.com",
    phone: "(555) 456-7890",
    orders: 20,
    totalSpent: 48500,
    joinDate: "2022-11-05",
    status: "Actif",
  },
  {
    id: "CUST-005",
    name: "David Martinez",
    company: "Premium Retail",
    email: "david@premiumretail.com",
    phone: "(555) 567-8901",
    orders: 5,
    totalSpent: 12300,
    joinDate: "2024-01-12",
    status: "Actif",
  },
];

export default function AdminCustomersPage() {
  const miniStats = [
    { label: "Clients Totaux", value: CUSTOMERS.length },
    {
      label: "Clients Actifs",
      value: CUSTOMERS.filter((c) => c.status === "Actif").length,
      color: "text-green-600",
    },
    {
      label: "Cmd. Moyennes",
      value: (
        CUSTOMERS.reduce((sum, c) => sum + c.orders, 0) / CUSTOMERS.length
      ).toFixed(1),
    },
    {
      label: "Total Dépensé",
      value: `$${CUSTOMERS.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Gestion des Clients
        </h1>
        <Link href="/admin/customers/add">
          <Button className="gap-2 rounded-xl w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            Ajouter Client
          </Button>
        </Link>
      </div>

      {/* ── Stats ── */}
      <MiniStats stats={miniStats} columns={4} />

      {/* ── Customers Table ── */}
      <CustomersTable customers={CUSTOMERS} />
    </div>
  );
}
