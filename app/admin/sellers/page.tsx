"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserPlus, Loader2, Mail, Building2, Calendar } from "lucide-react";

interface Seller {
  id: string;
  name: string | null;
  email: string;
  company: string | null;
  createdAt: string;
}

export default function SellersPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/sellers/list")
      .then((res) => res.json())
      .then((data) => {
        setSellers(data.sellers || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Gestion des Vendeurs
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gérez les comptes vendeurs et envoyez des invitations
          </p>
        </div>
        <Link href="/admin/sellers/add">
          <Button className="gap-2 rounded-xl w-full sm:w-auto">
            <UserPlus className="w-4 h-4" />
            Ajouter Vendeur
          </Button>
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Empty state */}
      {!loading && sellers.length === 0 && (
        <div className="bg-card border border-border/50 rounded-2xl p-8 sm:p-12 text-center space-y-4">
          <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mx-auto">
            <UserPlus className="w-7 h-7 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-bold">Aucun vendeur</h2>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Aucun compte vendeur n&apos;a été créé. Ajoutez votre premier
            vendeur pour qu&apos;il puisse accéder à la plateforme.
          </p>
          <Link href="/admin/sellers/add">
            <Button className="gap-2 rounded-xl">
              <UserPlus className="w-4 h-4" />
              Ajouter le premier vendeur
            </Button>
          </Link>
        </div>
      )}

      {/* Sellers list */}
      {!loading && sellers.length > 0 && (
        <div className="border border-border rounded-xl overflow-hidden bg-card">
          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-border">
            {sellers.map((seller) => (
              <div key={seller.id} className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm">
                      {seller.name || "Sans nom"}
                    </p>
                    {seller.company && (
                      <p className="text-xs text-muted-foreground">
                        {seller.company}
                      </p>
                    )}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary flex-shrink-0">
                    Vendeur
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Mail className="w-3 h-3" />
                  {seller.email}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {new Date(seller.createdAt).toLocaleDateString("fr-FR")}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary border-b border-border">
                <tr>
                  <th className="text-left px-4 lg:px-6 py-3 font-semibold text-sm">
                    Nom
                  </th>
                  <th className="text-left px-4 lg:px-6 py-3 font-semibold text-sm">
                    Email
                  </th>
                  <th className="text-left px-4 lg:px-6 py-3 font-semibold text-sm">
                    Entreprise
                  </th>
                  <th className="text-left px-4 lg:px-6 py-3 font-semibold text-sm">
                    Créé le
                  </th>
                  <th className="text-left px-4 lg:px-6 py-3 font-semibold text-sm">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller) => (
                  <tr
                    key={seller.id}
                    className="border-b border-border hover:bg-secondary/50 transition"
                  >
                    <td className="px-4 lg:px-6 py-4 font-semibold text-sm">
                      {seller.name || "Sans nom"}
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm text-foreground/70">
                      {seller.email}
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm">
                      {seller.company || "—"}
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm text-foreground/70">
                      {new Date(seller.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                        Actif
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
