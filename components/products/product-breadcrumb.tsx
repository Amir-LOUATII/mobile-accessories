import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ProductBreadcrumbProps {
  productName: string;
}

export function ProductBreadcrumb({ productName }: ProductBreadcrumbProps) {
  return (
    <section className="border-b border-border/50 bg-card/30">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            href="/"
            className="hover:text-primary transition-colors duration-200"
          >
            Accueil
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href="/products"
            className="hover:text-primary transition-colors duration-200"
          >
            Produits
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium truncate max-w-[200px]">
            {productName}
          </span>
        </div>
      </div>
    </section>
  );
}
