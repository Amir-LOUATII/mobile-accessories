import { formatPrice } from "@/lib/utils";

interface PricingCardProps {
  currentPrice: number;
  basePrice: number;
  savings: string;
  totalPrice: number;
  quantity: number;
}

export function PricingCard({
  currentPrice,
  basePrice,
  savings,
  totalPrice,
  quantity,
}: PricingCardProps) {
  return (
    <div className="bg-gradient-to-br from-card to-secondary/30 border border-border/50 rounded-2xl p-6 space-y-4">
      <div className="flex items-end gap-3">
        <span className="text-4xl font-extrabold">
          {formatPrice(currentPrice)}
        </span>
        {currentPrice < basePrice && (
          <span className="text-lg text-muted-foreground line-through mb-1">
            {formatPrice(basePrice)}
          </span>
        )}
        <span className="text-muted-foreground text-sm mb-1">/unité</span>
      </div>

      {savings !== "0" && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-sm font-semibold">
          <span>🎉</span> Économie de {savings}%
        </div>
      )}

      <div className="text-sm text-muted-foreground">
        Total:{" "}
        <span className="font-bold text-foreground">
          {formatPrice(totalPrice)}
        </span>{" "}
        pour {quantity} unités
      </div>
    </div>
  );
}
