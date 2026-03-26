"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/lib/mock-data";
import {
  Truck,
  Shield,
  CheckCircle,
  Package,
  Loader2,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { createOrder } from "@/app/actions/orders";
import { toast } from "sonner";

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
  onClearCart: () => void;
}

const BENEFITS = [
  { icon: CheckCircle, text: "Remises volume appliquées" },
  { icon: Truck, text: "Livraison express offerte" },
  { icon: Shield, text: "Garantie satisfait ou remboursé" },
  { icon: Package, text: "Emballage professionnel" },
];

export function OrderSummary({
  items,
  total,
  onClearCart,
}: OrderSummaryProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);
  const role = session?.user?.role;
  const canCheckout = role === "seller" || role === "admin";

  const handleCheckout = async () => {
    if (!canCheckout) {
      router.push("/login");
      return;
    }

    if (items.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }

    setIsSubmitting(true);
    try {
      const itemsPayload = items.map(i => ({
        productId: i.productId,
        quantity: i.quantity,
        price: i.price,
      }));

      const res = await createOrder({ items: itemsPayload, total });
      
      if (res.error) {
        toast.error(res.error);
      } else {
        onClearCart();
        toast.success("Commande validée avec succès !");
        router.push("/checkout/success");
      }
    } catch (err) {
      toast.error("Erreur serveur lors de la validation");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-card border border-border/50 rounded-2xl p-4 sm:p-6 sticky top-24 space-y-4 sm:space-y-5">
        <h2 className="text-lg sm:text-xl font-black">Résumé</h2>

        <div className="space-y-3 border-b border-border/50 pb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Articles</span>
            <span className="font-semibold">{items.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total unités</span>
            <span className="font-semibold">{totalUnits}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Livraison</span>
            <span className="font-semibold text-emerald-600">Gratuite</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-baseline">
            <span className="font-bold text-sm sm:text-base">Total HT</span>
            <span className="text-xl sm:text-2xl font-black">
              {formatPrice(total)}
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            TVA calculée à la validation
          </p>
        </div>

        <div className="space-y-2.5">
          <Button
            onClick={handleCheckout}
            disabled={isSubmitting || items.length === 0}
            className="w-full rounded-xl shadow-lg shadow-primary/25 gap-2"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Validation...
              </>
            ) : (
              "Passer la commande"
            )}
          </Button>
          <Link href="/products">
            <Button variant="outline" className="w-full rounded-xl">
              Continuer les achats
            </Button>
          </Link>
          <button
            onClick={onClearCart}
            className="w-full text-xs text-muted-foreground hover:text-destructive transition-colors py-2"
          >
            Vider le panier
          </button>
        </div>

        {/* Benefits */}
        <div className="bg-secondary/50 rounded-xl p-3 sm:p-4 space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/70">
            Avantages inclus
          </h4>
          {BENEFITS.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <item.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
