"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, Loader2 } from "lucide-react";
import { MiniStats } from "@/components/admin/mini-stats";
import { CustomersTable } from "@/components/admin/customers-table";
import { formatPrice } from "@/lib/utils";

interface Seller {
  id: string;
  name: string | null;
  email: string;
  company: string | null;
  createdAt: string;
}

interface CustomerRow {
  id: string;
  name: string;
  company: string;
  email: string;
  orders: number;
  totalSpent: number;
  status: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCustomers = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/sellers/list");
      if (!res.ok) throw new Error("Erreur lors du chargement");

      const data = await res.json();
      const mapped: CustomerRow[] = (data.sellers || []).map(
        (seller: Seller) => ({
          id: seller.id,
          name: seller.name || "—",
          company: seller.company || "—",
          email: seller.email,
          orders: 0,
          totalSpent: 0,
          status: "Actif",
        })
      );
      setCustomers(mapped);
    } catch {
      setError("Impossible de charger les clients. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const miniStats = [
    { label: "Clients Totaux", value: customers.length },
    {
      label: "Clients Actifs",
      value: customers.filter((c) => c.status === "Actif").length,
      color: "text-green-600",
    },
    {
      label: "Cmd. Moyennes",
      value:
        customers.length > 0
          ? (
              customers.reduce((sum, c) => sum + c.orders, 0) /
              customers.length
            ).toFixed(1)
          : "0",
    },
    {
      label: "Total Dépensé",
      value: formatPrice(customers.reduce((sum, c) => sum + c.totalSpent, 0)),
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Gestion des Clients / Revendeurs
        </h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2 rounded-xl"
            onClick={fetchCustomers}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Actualiser</span>
          </Button>
          <Link href="/admin/customers/add">
            <Button className="gap-2 rounded-xl w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              Ajouter Client
            </Button>
          </Link>
        </div>
      </div>

      {/* ── Stats ── */}
      <MiniStats stats={miniStats} columns={4} />

      {/* ── Error ── */}
      {error && (
        <div className="p-4 bg-red-100 border border-red-300 rounded-xl text-red-800 font-medium">
          ⚠️ {error}
        </div>
      )}

      {/* ── Loading ── */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Chargement…</span>
        </div>
      )}

      {/* ── Empty State ── */}
      {!isLoading && !error && customers.length === 0 && (
        <div className="text-center py-12 border border-border rounded-xl bg-card">
          <p className="text-muted-foreground mb-4">
            Aucun client / revendeur enregistré pour l&apos;instant.
          </p>
          <Link href="/admin/customers/add">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Ajouter votre premier client
            </Button>
          </Link>
        </div>
      )}

      {/* ── Customers Table ── */}
      {!isLoading && customers.length > 0 && (
        <CustomersTable customers={customers} />
      )}
    </div>
  );
}
