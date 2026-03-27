"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, RefreshCw, Loader2, Search } from "lucide-react";
import { MiniStats } from "@/components/admin/mini-stats";
import { CustomersTable } from "@/components/admin/customers-table";
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

interface Seller {
  id: string;
  name: string | null;
  email: string;
  company: string | null;
  isActive: boolean;
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
  isActive: boolean;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchCustomers = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/sellers/list?page=${currentPage}&limit=10&search=${encodeURIComponent(searchQuery)}&status=${statusFilter}`);
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
          status: seller.isActive ? "Actif" : "Inactif",
          isActive: seller.isActive,
        })
      );
      setCustomers(mapped);
      
      if (data.pagination) {
        setTotalPages(data.pagination.totalPages);
        setTotalItems(data.pagination.totalItems);
      }
    } catch {
      setError("Impossible de charger les clients. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCustomers();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, searchQuery, statusFilter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const miniStats = [
    { label: "Clients Totaux", value: totalItems },
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

      {/* ── Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher..."
            className="pl-9 bg-card border-border rounded-xl"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="w-full sm:w-40">
          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className="bg-card rounded-xl">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="inactive">Inactif</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          className="gap-2 rounded-xl w-full sm:w-auto"
          onClick={fetchCustomers}
          disabled={isLoading}
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Actualiser</span>
        </Button>
      </div>

      {/* ── Loading ── */}
      {isLoading && (
        <div className="border border-border rounded-xl overflow-hidden bg-card">
          {/* Mobile Loading */}
          <div className="md:hidden divide-y divide-border">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 w-1/2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-3 w-3/4" />
                <div className="flex gap-4">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Loading */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary border-b border-border">
                <tr>
                  {[...Array(6)].map((_, i) => (
                    <th key={i} className="text-left px-4 lg:px-6 py-3">
                      <Skeleton className="h-4 w-20" />
                    </th>
                  ))}
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {[...Array(10)].map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="px-4 lg:px-6 py-4">
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <Skeleton className="h-4 w-40" />
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
                    <td className="px-4 py-4 text-right">
                      <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
        <>
          <CustomersTable customers={customers} onUpdate={fetchCustomers} />
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
        </>
      )}
    </div>
  );
}
