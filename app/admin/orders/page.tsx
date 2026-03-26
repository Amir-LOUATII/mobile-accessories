"use client";

import { useEffect, useState, useCallback } from "react";
import { MiniStats } from "@/components/admin/mini-stats";
import { OrdersTable } from "@/components/admin/orders-table";
import { getAdminOrders } from "@/app/actions/orders";
import { formatPrice } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCw, Search, Loader2 } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

/* Status mappings for database enum -> frontend French strings */
const STATUS_LABELS: Record<string, string> = {
  pending: "En attente",
  confirmed: "En cours",
  shipped: "Expédié",
  delivered: "Livré",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stats, setStats] = useState({ revenue: 0, pending: 0, shipped: 0 });

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await getAdminOrders({
        page: currentPage,
        limit: 10,
        search: searchQuery,
        status: statusFilter,
      });

      if (res.error) {
        throw new Error(res.error);
      }

      setOrders(res.orders || []);
      
      if (res.pagination) {
        setTotalPages(res.pagination.totalPages);
        setTotalItems(res.pagination.totalItems);
      }
      
      // We could calculate stats client side or get them from server
      // For now, let's just use what we have in the current page of results for basic stats 
      // or set static if the backend hasn't implemented full aggregation.
      let rev = 0;
      let pen = 0;
      let shp = 0;
      (res.orders || []).forEach((o: any) => {
        rev += parseFloat(o.total || 0);
        if (o.status === 'pending') pen++;
        if (o.status === 'shipped') shp++;
      });
      setStats({ revenue: rev, pending: pen, shipped: shp });

    } catch (err: any) {
      setError(err.message || "Impossible de charger les commandes.");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchQuery, statusFilter]);

  // Debounce effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchOrders();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchOrders]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (val: string) => {
    setStatusFilter(val);
    setCurrentPage(1);
  };

  const miniStats = [
    { label: "Commandes Totales", value: totalItems },
    {
      label: "En attente (Vue)",
      value: stats.pending,
      color: "text-yellow-600",
    },
    {
      label: "Expédié (Vue)",
      value: stats.shipped,
      color: "text-blue-600",
    },
    {
      label: "Revenu (Vue)",
      value: formatPrice(stats.revenue),
    },
  ];

  const mappedOrders = orders.map((o) => ({
    id: o.id.toString(),
    customer: o.user?.name || o.user?.company || "Anonyme",
    email: o.user?.email || "—",
    items: o.items ? o.items.reduce((acc: number, item: any) => acc + item.quantity, 0) : 0,
    total: parseFloat(o.total),
    status: STATUS_LABELS[o.status as string] || o.status,
    date: new Date(o.createdAt).toLocaleDateString(),
  }));

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Gestion des Commandes
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Chercher (Nom, ID)..."
                className="pl-9 bg-card border-border rounded-xl"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="w-32 sm:w-40">
              <Select value={statusFilter} onValueChange={handleStatusChange}>
                <SelectTrigger className="bg-card rounded-xl">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="confirmed">En cours</SelectItem>
                  <SelectItem value="shipped">Expédié</SelectItem>
                  <SelectItem value="delivered">Livré</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2 rounded-xl"
              onClick={fetchOrders}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Actualiser</span>
            </Button>
          </div>
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

      {/* ── Loading Skeletons ── */}
      {isLoading && (
        <div className="border border-border rounded-xl bg-card overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary border-b border-border">
                <tr>
                  {[...Array(6)].map((_, i) => (
                    <th key={i} className="text-left px-4 lg:px-6 py-3">
                      <Skeleton className="h-4 w-20" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="px-4 lg:px-6 py-4">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <Skeleton className="h-4 w-12" />
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <Skeleton className="h-4 w-20" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Empty ── */}
      {!isLoading && !error && mappedOrders.length === 0 && (
        <div className="text-center py-12 border border-border rounded-xl bg-card">
          <p className="text-muted-foreground">Aucune commande trouvée.</p>
        </div>
      )}

      {/* ── Orders Table ── */}
      {!isLoading && mappedOrders.length > 0 && (
        <OrdersTable orders={mappedOrders} />
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); if (currentPage > 1) setCurrentPage(p => p - 1); }} 
                  className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                if (
                  page === 1 || 
                  page === totalPages || 
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink 
                        href="#" 
                        isActive={currentPage === page}
                        onClick={(e) => { e.preventDefault(); setCurrentPage(page); }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (
                  page === currentPage - 2 || 
                  page === currentPage + 2
                ) {
                  return (
                    <PaginationItem key={i}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) setCurrentPage(p => p + 1); }} 
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
