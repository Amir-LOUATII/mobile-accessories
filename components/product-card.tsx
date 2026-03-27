import { Product } from "@/lib/mock-data";
import { ProductCardImage } from "@/components/products/product-card-image";
import { AddToCartButton } from "@/components/products/add-to-cart-button";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const badgeColors: Record<string, string> = {
  "Best-seller": "bg-accent text-accent-foreground",
  Nouveau: "bg-primary text-primary-foreground",
  Populaire: "bg-purple-500 text-white",
  Volume: "bg-emerald-500 text-white",
  Tendance: "bg-pink-500 text-white",
  Pro: "bg-amber-500 text-white",
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      className={`group bg-card border border-border/60 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 flex flex-col h-full ${
        product.stock === 0 ? "opacity-75" : ""
      }`}
    >
      <ProductCardImage
        productId={product.id}
        image={product.image}
        name={product.name}
        stock={product.stock}
        badge={product.badge}
        badgeColors={badgeColors}
      />

      <div className="flex flex-col flex-1 p-5 space-y-3">
        {/* Category */}
        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary/70">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="font-bold text-[15px] leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 flex-1 leading-relaxed">
          {product.description}
        </p>

        {/* Pricing */}
        <div className="space-y-1 pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-foreground">
              {formatPrice(product.basePrice)}
            </span>
            <span className="text-[10px] text-muted-foreground">/unité</span>
          </div>

          <p className="text-[11px] text-muted-foreground">
            Min. {product.minOrder} unités
          </p>
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-1.5">
          {product.stock === 0 ? (
            <span className="text-destructive text-xs font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive inline-block" />
              Rupture de Stock
            </span>
          ) : product.stock > 100 ? (
            <span className="text-emerald-600 text-xs font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              En stock
            </span>
          ) : (
            <span className="text-amber-600 text-xs font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block animate-pulse-soft" />
              {product.stock} restants
            </span>
          )}
        </div>

        {/* Client Component: Interactivity */}
        <AddToCartButton
          productId={product.id}
          minOrder={product.minOrder}
          stock={product.stock}
        />
      </div>
    </div>
  );
}
