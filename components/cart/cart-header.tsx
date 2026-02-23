import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface CartHeaderProps {
  itemCount: number;
}

export function CartHeader({ itemCount }: CartHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <Link
        href="/products"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-3 sm:mb-4"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Continuer les achats
      </Link>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
        Panier d&apos;Achat
      </h1>
      <p className="text-muted-foreground mt-1 text-sm sm:text-base">
        {itemCount} article{itemCount > 1 ? "s" : ""} · Vérifiez et validez
        votre commande
      </p>
    </div>
  );
}
