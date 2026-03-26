"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Package, User, CheckCircle2, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getOrderById, updateOrderStatus } from "@/app/actions/orders";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";

export default function AdminOrderDetailsPage() {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
const params = useParams();
  useEffect(() => {
    async function fetchOrder() {
      setIsLoading(true);
      setError("");
      try {
        const res = await getOrderById(parseInt(params.id, 10));
        if (res.error) throw new Error(res.error);
        if (res.order) {
          setOrder(res.order);
          setStatus(res.order.status);
        }
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement de la commande.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrder();
  }, [params.id]);

  const handleUpdateStatus = async () => {
    if (!status || status === order?.status) return;

    setIsUpdating(true);
    try {
      const res = await updateOrderStatus(parseInt(params.id, 10), status);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Statut de la commande mis à jour");
        setOrder((prev: any) => ({ ...prev, status }));
      }
    } catch (err) {
      toast.error("Erreur serveur");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground text-lg">Chargement de la commande...</span>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center space-y-4">
        <div className="p-6 bg-red-100 border border-red-300 rounded-2xl text-red-800 font-medium text-lg">
          ⚠️ {error || "Commande introuvable"}
        </div>
        <Link href="/admin/orders">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Retour aux commandes
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Retour aux commandes
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
            Commande #{order.id}
          </h1>
          <p className="text-muted-foreground mt-1">
            Placée le {new Date(order.createdAt).toLocaleDateString("fr-FR", {
              year: 'numeric', month: 'long', day: 'numeric',
              hour: '2-digit', minute: '2-digit'
            })}
          </p>
        </div>

        {/* ── StatusUpdater ── */}
        <div className="bg-card border border-border/50 p-4 rounded-xl flex items-center gap-3 w-full sm:w-auto">
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Statut
            </span>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[160px] h-9">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="confirmed">En cours</SelectItem>
                <SelectItem value="shipped">Expédié</SelectItem>
                <SelectItem value="delivered">Livré</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={handleUpdateStatus} 
            disabled={isUpdating || status === order.status}
            className="mt-5 h-9"
          >
            {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Mettre à jour"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ── Left Column: Items ── */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-border bg-secondary/30 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold">Articles demandés</h2>
            </div>
            <div className="divide-y divide-border">
              {order.items.map((item: any) => (
                <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-border/50 bg-secondary/20 flex-shrink-0">
                    <Image
                      src={item.product?.image || "/placeholder.jpg"}
                      alt={item.product?.name || "Produit sans nom"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base truncate">
                      {item.product?.name || "Produit sans nom"}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>Prix unitaire : {formatPrice(parseFloat(item.price))}</span>
                      <span>Quantité : <strong className="text-foreground">{item.quantity}</strong></span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-black text-lg">
                      {formatPrice(parseFloat(item.price) * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Column: Summary & Customer ── */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold">Client</h2>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-1">Nom / Entreprise</p>
                <p className="font-medium text-base">{order.user?.name || "—"}</p>
                {order.user?.company && <p className="text-muted-foreground">{order.user.company}</p>}
              </div>
              <div className="pt-2">
                <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-1">Adresse Email</p>
                <a href={`mailto:${order.user?.email}`} className="text-primary hover:underline">
                  {order.user?.email || "—"}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">Résumé financier</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sous-total (HT)</span>
                <span className="font-semibold">{formatPrice(parseFloat(order.total))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frais de livraison</span>
                <span className="text-emerald-600 font-semibold">Gratuit</span>
              </div>
              <div className="pt-4 border-t border-border flex justify-between items-center">
                <span className="font-bold text-base">Total Réglé</span>
                <span className="font-black text-2xl text-primary">{formatPrice(parseFloat(order.total))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
