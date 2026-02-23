import { MOCK_PRODUCTS } from "@/lib/mock-data";

export function ProductsHeader() {
  return (
    <section className="relative overflow-hidden border-b border-border/50">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Catalogue
            <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mt-1">
              Accessoires Mobile
            </span>
          </h1>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Parcourez notre sélection de {MOCK_PRODUCTS.length} produits
            premium avec tarification dégressive.
          </p>
        </div>
      </div>
    </section>
  );
}
