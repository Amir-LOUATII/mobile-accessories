"use client";

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
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

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
  
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);
  const role = session?.user?.role;
  const canCheckout = role === "seller" || role === "admin";

  const handleCheckout = () => {
    if (!canCheckout) {
      router.push("/login");
      return;
    }
    // Proceed to actual checkout logic here in the future
    alert("Commande validée !");
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
            className="w-full rounded-xl shadow-lg shadow-primary/25"
            size="lg"
          >
            Passer la commande
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
