import { Star } from "lucide-react";

interface ProductDetailsProps {
  category: string;
  name: string;
  description: string;
  isPlaceholder: boolean;
}

export function ProductDetails({
  category,
  name,
  description,
  isPlaceholder,
}: ProductDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Category & Badge */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-bold uppercase tracking-wider text-primary/70">
          {category}
        </span>
        {isPlaceholder && (
          <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-muted text-muted-foreground">
            Démonstration
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
        {name}
      </h1>

      {/* Rating Placeholder */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < 4
                  ? "fill-amber-400 text-amber-400"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">4.0 (127 avis)</span>
      </div>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
