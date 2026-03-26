"use client";

import { useEffect, useState, Fragment } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Package, ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";
import { getUserOrders } from "@/app/actions/orders";
import Link from "next/link";

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: { label: "En attente", color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" },
  confirmed: { label: "En cours", color: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
  shipped: { label: "Expédié", color: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
  delivered: { label: "Livré", color: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" },
};

export function UserOrdersList() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await getUserOrders();
        if (res.error) throw new Error(res.error);
        if (res.orders) setOrders(res.orders);
      } catch (err: any) {
        setError(err.message || "Erreur au chargement des commandes.");
      } finally {
        setIsLoading(false);
      }
    }
    loadOrders();
  }, []);

  const toggleOrder = (orderId: number) => {
    const next = new Set(expandedOrders);
    if (next.has(orderId)) {
      next.delete(orderId);
    } else {
      next.add(orderId);
    }
    setExpandedOrders(next);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
        <p>Recherche de vos commandes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-100 border border-red-300 rounded-2xl text-red-800 text-center font-medium">
        ⚠️ {error}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16 px-4 border border-border rounded-3xl bg-card">
        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-bold mb-2">Aucune commande trouvée</h3>
        <p className="text-muted-foreground mb-6">Vous n'avez pas encore passé de commande sur la plateforme.</p>
        <Link href="/products">
          <Button className="rounded-xl px-8">Découvrir le catalogue</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-secondary/50 border-b border-border">
            <tr>
              <th className="px-4 py-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                ID Commande
              </th>
              <th className="px-4 py-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Articles
              </th>
              <th className="px-4 py-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Total
              </th>
              <th className="px-4 py-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Statut
              </th>
              <th className="px-4 py-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider text-right">
                Détails
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => {
              const isExpanded = expandedOrders.has(order.id);
              const statusDetails = STATUS_MAP[order.status] || {
                label: order.status,
                color: "bg-secondary text-foreground",
              };
              const totalItems = order.items.reduce(
                (sum: number, i: any) => sum + i.quantity,
                0
              );

              return (
                <Fragment key={order.id}>
                  <tr
                    className={`hover:bg-secondary/20 transition-colors cursor-pointer ${
                      isExpanded ? "bg-secondary/10" : ""
                    }`}
                    onClick={() => toggleOrder(order.id)}
                  >
                    <td className="px-4 py-4 whitespace-nowrap font-bold">
                      #{order.id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {totalItems} unité{totalItems > 1 ? "s" : ""}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap font-bold text-base">
                      {formatPrice(parseFloat(order.total))}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge
                        variant="secondary"
                        className={`font-semibold ${statusDetails.color}`}
                      >
                        {statusDetails.label}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                    </td>
                  </tr>

                  {/* ── Expanded Row for Items ── */}
                  {isExpanded && (
                    <tr className="bg-secondary/5">
                      <td colSpan={6} className="p-0 border-b border-border">
                        <div className="p-4 sm:p-6 lg:px-12 animate-in fade-in slide-in-from-top-2 duration-200">
                          <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-4">
                            Contenu de la commande
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {order.items.map((item: any) => (
                              <div
                                key={item.id}
                                className="flex items-center gap-4 bg-background p-3 rounded-xl border border-border/50 shadow-sm"
                              >
                                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-secondary border border-border/50 flex-shrink-0">
                                  <Image
                                    src={
                                      item.product?.image || "/placeholder.jpg"
                                    }
                                    alt={item.product?.name || "Produit"}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-bold text-sm truncate">
                                    {item.product?.name || "Produit supprimé"}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    Qté:{" "}
                                    <strong className="text-foreground">
                                      {item.quantity}
                                    </strong>{" "}
                                    × {formatPrice(parseFloat(item.price))}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
