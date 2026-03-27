"use client";

import { useFavorites } from "@/components/favorites-context";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface FavoriteButtonProps {
  productId: string; // The product card passes string ID from mock-data/adapters
  className?: string;
}

export function FavoriteButton({ productId, className }: FavoriteButtonProps) {
  const { favoriteIds, toggleFavorite, isLoading } = useFavorites();
  const { status } = useSession();
  const router = useRouter();

  const numId = parseInt(productId, 10);
  const isFavorite = favoriteIds.includes(numId);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    await toggleFavorite(numId);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={cn(
        "flex items-center justify-center p-2 rounded-full transition-all duration-300",
        "bg-white/80 backdrop-blur-sm border border-transparent shadow-sm hover:scale-110 active:scale-95",
        isFavorite
          ? "text-rose-500 border-rose-200"
          : "text-muted-foreground hover:text-rose-400 hover:border-border",
        className
      )}
      aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <Heart
        className={cn("w-4.5 h-4.5 transition-all duration-300", isFavorite ? "fill-current" : "")}
      />
    </button>
  );
}
