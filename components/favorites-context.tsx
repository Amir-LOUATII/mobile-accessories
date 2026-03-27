"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useSession } from "next-auth/react";
import { getUserFavoriteIds, toggleFavorite as toggleFavoriteAction } from "@/app/actions/favorites";
import { toast } from "sonner"; // Assuming sonner is used for toasts, checking package.json it is.

interface FavoritesContextType {
  favoriteIds: number[];
  toggleFavorite: (productId: number) => Promise<void>;
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch true favorites on load when authenticated
  useEffect(() => {
    let mounted = true;

    async function fetchFavorites() {
      if (status === "loading") return;

      if (status === "unauthenticated") {
        setFavoriteIds([]);
        setIsLoading(false);
        return;
      }

      try {
        const ids = await getUserFavoriteIds();
        if (mounted) {
          setFavoriteIds(ids);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to load favorites", error);
        if (mounted) setIsLoading(false);
      }
    }

    fetchFavorites();

    return () => {
      mounted = false;
    };
  }, [status]);

  const toggleFavorite = useCallback(async (productId: number) => {
    if (status === "unauthenticated") {
      toast.error("Veuillez vous connecter pour ajouter aux favoris.");
      return;
    }

    // Optimistic Update
    setFavoriteIds((current) => {
      if (current.includes(productId)) {
        return current.filter((id) => id !== productId);
      } else {
        return [...current, productId];
      }
    });

    try {
      const res = await toggleFavoriteAction(productId);
      
      if (res?.error) {
        // Revert on error
        toast.error(res.error);
        setFavoriteIds((current) => {
           if (current.includes(productId)) {
             return current.filter((id) => id !== productId);
           } else {
             return [...current, productId];
           }
        });
      } else {
        if (res?.isFavorite) {
          toast.success("Produit ajouté aux favoris.");
        } else {
          toast.info("Produit retiré des favoris.");
        }
      }
    } catch (e) {
      toast.error("Erreur inattendue.");
    }
  }, [status]);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isLoading }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
