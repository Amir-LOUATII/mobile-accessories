"use client";

import { useState } from "react";
import { MiniStats } from "@/components/admin/mini-stats";
import { OrdersTable } from "@/components/admin/orders-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  
  const totalItems = ORDERS.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const startIndex = (currentPage - 1) * limit;
  const paginatedOrders = ORDERS.slice(startIndex, startIndex + limit);

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
      <OrdersTable orders={paginatedOrders} />

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
