interface WholesaleTier {
  quantity: number;
  price: number;
}

interface WholesaleTiersProps {
  wholesalePrices: WholesaleTier[];
  basePrice: number;
  currentQuantity: number;
}

export function WholesaleTiers({
  wholesalePrices,
  basePrice,
  currentQuantity,
}: WholesaleTiersProps) {
  return (
    <div>
      <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-foreground/70">
        Tarification dégressive
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {wholesalePrices.map((tier, idx) => (
          <div
            key={idx}
            className={`border rounded-xl p-3 text-center transition-all duration-300 ${
              currentQuantity >= tier.quantity
                ? "border-primary/40 bg-primary/5 shadow-sm"
                : "border-border/50 bg-card"
            }`}
          >
            <p className="text-xs text-muted-foreground mb-1">
              {tier.quantity}+ unités
            </p>
            <p
              className={`text-lg font-extrabold ${
                currentQuantity >= tier.quantity ? "text-primary" : ""
              }`}
            >
              {tier.price.toFixed(2)}€
            </p>
            <p className="text-[10px] text-muted-foreground">
              -{(((basePrice - tier.price) / basePrice) * 100).toFixed(0)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
