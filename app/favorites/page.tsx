import { getFavoriteProducts } from "@/app/actions/favorites";
import { Header } from "@/components/header";
import { ProductGrid } from "@/components/products/product-grid";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/mock-data";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";

export const metadata = {
  title: "Mes Favoris | MobileGros",
};

export default async function FavoritesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | undefined;
}) {
  const unresolvedParams = await searchParams;
  const pageParam = unresolvedParams?.page;
  const currentPage = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;
  const validPage = isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;

  const result = await getFavoriteProducts(validPage, 12);

  let products: Product[] = [];
  let error = null;
  let pagination = { totalPages: 1, currentPage: 1 };

  if (result.error) {
    error = result.error;
  } else if (result.products) {
    // Map db models to Product standard
    products = result.products.map((p: any) => ({
      id: p.id.toString(),
      name: p.name,
      category: p.category?.name || "—",
      description: p.description,
      image: p.image,
      basePrice: parseFloat(p.basePrice),
      wholesalePrices: (p.wholesalePrices || []).map((wp: any) => ({
        quantity: wp.quantity,
        price: parseFloat(wp.price),
      })),
      stock: p.stock,
      minOrder: p.minOrder,
      badge: p.badge || undefined,
    }));
    
    if (result.pagination) {
      pagination = result.pagination;
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background border-t border-border/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Page Header */}
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
              Mes Favoris
            </h1>
            <p className="text-muted-foreground text-sm">
              Consultez et gérez les produits que vous avez sauvegardés.
            </p>
          </div>

          {error ? (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-xl p-6 text-center">
              {error}
              <div className="mt-4">
                <Link
                  href="/login"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-xl font-medium transition-colors"
                >
                  Se connecter
                </Link>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-card border border-border/60 rounded-3xl gap-4">
              <div className="w-16 h-16 bg-rose-100 dark:bg-rose-500/10 rounded-full flex items-center justify-center mb-2">
                <Heart className="w-8 h-8 text-rose-400" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                Aucun favori pour le moment
              </h2>
              <p className="text-muted-foreground max-w-sm text-center">
                Vous n'avez pas encore ajouté de produits à vos favoris. Parcourez
                notre catalogue pour sauvegarder les articles qui vous intéressent.
              </p>
              <Link
                href="/products"
                className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-xl font-medium shadow-sm transition-colors"
              >
                Explorer nos produits
              </Link>
            </div>
          ) : (
            <>
              <ProductGrid products={products} />
              
              {pagination.totalPages > 1 && (
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href={validPage > 1 ? `/favorites?page=${validPage - 1}` : "#"}
                          className={validPage <= 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {[...Array(pagination.totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        if (
                          pageNum === 1 || 
                          pageNum === pagination.totalPages || 
                          (pageNum >= validPage - 1 && pageNum <= validPage + 1)
                        ) {
                          return (
                            <PaginationItem key={i}>
                              <PaginationLink 
                                href={`/favorites?page=${pageNum}`}
                                isActive={validPage === pageNum}
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        } else if (
                          pageNum === validPage - 2 || 
                          pageNum === validPage + 2
                        ) {
                          return (
                            <PaginationItem key={i}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        return null;
                      })}
                      
                      <PaginationItem>
                        <PaginationNext 
                          href={validPage < pagination.totalPages ? `/favorites?page=${validPage + 1}` : "#"}
                          className={validPage >= pagination.totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
