import { Header } from '@/components/header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="border-b border-border py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">À Propos de Vente Gros</h1>
            <p className="text-lg text-foreground/70">
              Connecter les entreprises avec des produits en gros fiables à des prix compétitifs
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Notre Histoire</h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Vente Gros a été fondée avec une simple mission: rendre l'achat en gros simple, transparent et accessible aux entreprises de toutes tailles. Nous comprenons les défis de l'approvisionnement en produits de qualité à des prix en gros.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                Notre plateforme connecte des milliers d'acheteurs et de fournisseurs, permettant une commande en gros efficace avec une tarification échelonnée compétitive. Nous gérons la complexité pour que vous puissiez vous concentrer sur votre entreprise.
              </p>
            </div>

            {/* Values */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Nos Valeurs</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2">Transparence</h3>
                  <p className="text-foreground/70">
                    Tarification claire, informations honnêtes sur les produits et conditions directes.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2">Fiabilité</h3>
                  <p className="text-foreground/70">
                    Fournisseurs fiables, qualité cohérente et livraison à temps.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2">Assistance</h3>
                  <p className="text-foreground/70">
                    Assistance d'experts à chaque étape de votre parcours en gros.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-8 my-12 py-8 border-y border-border">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">2 500+</div>
                <div className="text-foreground/70">Produits Disponibles</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-foreground/70">Acheteurs Actifs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50M$+</div>
                <div className="text-foreground/70">Commandes Traitées</div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-secondary rounded-lg p-8 text-center space-y-4">
              <h3 className="text-2xl font-bold">Prêt à Commencer?</h3>
              <p className="text-foreground/70">
                Parcourez notre catalogue et découvrez la tarification en gros sur des milliers de produits.
              </p>
              <Link href="/products">
                <Button size="lg">
                  Parcourir les Produits
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
