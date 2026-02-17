import Link from "next/link";
import { ArrowRight, Truck, DollarSign, TrendingUp } from "lucide-react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,theme(colors.primary/20),transparent_40%)]"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center max-w-3xl mx-auto space-y-8">
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight">
                Accessoires Mobile
                <span className="block text-primary">Nouvelle Génération</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground">
                Coques, chargeurs rapides, câbles premium et accessoires conçus
                pour les revendeurs modernes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/products">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    Voir le catalogue
                  </Button>
                </Link>

                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    En savoir plus
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        ;{/* Features Section */}
        <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Pourquoi nous choisir ?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tout ce dont vous avez besoin pour une commande en gros efficace
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-card border border-border rounded-xl p-8 transition hover:shadow-xl hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Tarification Échelonnée
                </h3>
                <p className="text-muted-foreground">
                  Plus vous commandez, plus vos marges augmentent. Notre
                  tarification récompense le volume.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-card border border-border rounded-xl p-8 transition hover:shadow-xl hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Expédition Rapide</h3>
                <p className="text-muted-foreground">
                  Commandes préparées et expédiées rapidement pour assurer votre
                  réapprovisionnement.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-card border border-border rounded-xl p-8 transition hover:shadow-xl hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Support Professionnel
                </h3>
                <p className="text-muted-foreground">
                  Une équipe dédiée aux professionnels pour optimiser vos
                  commandes et votre rentabilité.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Prêt à Développer Votre Stock ?
            </h2>

            <p className="text-lg opacity-90">
              Rejoignez des centaines de revendeurs qui optimisent déjà leurs
              marges avec notre plateforme.
            </p>

            <Link href="/products">
              <Button size="lg" variant="secondary" className="gap-2">
                Explorer le Catalogue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
        {/* Footer */}
        <footer className="bg-background border-t border-border py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold mb-4">Vente Gros</h3>
                <p className="text-muted-foreground text-sm">
                  Accessoires mobile en gros pour professionnels.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Entreprise</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-primary transition"
                    >
                      À propos
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-primary transition">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-primary transition">
                      Carrières
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Produits</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="/products"
                      className="hover:text-primary transition"
                    >
                      Catalogue
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products"
                      className="hover:text-primary transition"
                    >
                      Catégories
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-primary transition">
                      Offres
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Légal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="/" className="hover:text-primary transition">
                      Confidentialité
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-primary transition">
                      Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-primary transition">
                      Sécurité
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <p className="text-center text-muted-foreground text-sm">
                © 2026 Plateforme Vente Gros. Tous droits réservés.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
