import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft } from "lucide-react";

export function EmptyCart() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto">
          <ShoppingCart className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
          Panier Vide
        </h1>
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
          Votre panier est vide. Explorez notre catalogue pour découvrir nos
          accessoires mobiles à prix grossiste.
        </p>
        <Link href="/products">
          <Button
            size="lg"
            className="gap-2 rounded-xl px-8 shadow-lg shadow-primary/25"
          >
            <ArrowLeft className="w-4 h-4" />
            Explorer le catalogue
          </Button>
        </Link>
      </div>
    </div>
  );
}
