import { Header } from '@/components/header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Smartphone, Shield, Users, Award, ArrowRight, Zap, Package, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="relative overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[100px]" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
              Notre histoire
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
              À Propos de{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MobileGros
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              La plateforme B2B de référence pour l&apos;approvisionnement en accessoires mobiles.
              Prix compétitifs, qualité garantie, livraison express.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-14">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-black mb-5">Notre Mission</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  MobileGros a été fondée avec une mission claire : démocratiser l&apos;accès aux accessoires mobiles de qualité à des prix grossiste compétitifs pour tous les revendeurs professionnels.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Notre plateforme connecte directement les revendeurs aux fabricants, éliminant les intermédiaires pour offrir les meilleurs tarifs du marché avec une tarification dégressive transparente.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/10 rounded-3xl p-8 space-y-4">
                {[
                  { icon: Zap, text: '+2 500 références disponibles' },
                  { icon: Package, text: 'Expédition sous 24h garantie' },
                  { icon: Users, text: '+500 revendeurs nous font confiance' },
                  { icon: TrendingUp, text: 'Jusqu\'à -60% sur les volumes' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Values */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
                Nos valeurs
              </span>
              <h2 className="text-3xl font-black mb-8">Ce Qui Nous Distingue</h2>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  {
                    icon: Shield,
                    title: 'Transparence',
                    desc: 'Tarification claire et dégressive. Pas de frais cachés, pas de surprises. Vous savez exactement ce que vous payez.',
                  },
                  {
                    icon: Award,
                    title: 'Qualité',
                    desc: 'Chaque produit est testé et certifié. Nous travaillons uniquement avec des fabricants vérifiés et fiables.',
                  },
                  {
                    icon: Users,
                    title: 'Partenariat',
                    desc: 'Un accompagnement expert pour optimiser vos commandes, anticiper les tendances et maximiser vos marges.',
                  },
                ].map((value, idx) => (
                  <div
                    key={idx}
                    className="group bg-card border border-border/50 rounded-2xl p-7 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/15 to-primary/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-y border-border/50">
              {[
                { value: '2 500+', label: 'Produits', sublabel: 'Références actives' },
                { value: '500+', label: 'Revendeurs', sublabel: 'Clients fidèles' },
                { value: '50M€+', label: 'Volume', sublabel: 'Commandes traitées' },
                { value: '4.8/5', label: 'Note', sublabel: 'Satisfaction client' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="font-bold text-sm">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/10 rounded-3xl p-10 text-center space-y-5">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/10 rounded-full blur-[80px]" />
              <div className="relative">
                <h3 className="text-2xl sm:text-3xl font-black">Prêt à Commencer ?</h3>
                <p className="text-muted-foreground max-w-lg mx-auto mt-3">
                  Parcourez notre catalogue et découvrez nos prix grossiste exclusifs sur des milliers d&apos;accessoires mobiles.
                </p>
                <Link href="/products">
                  <Button size="lg" className="mt-6 rounded-xl gap-2 px-8 shadow-lg shadow-primary/25">
                    Explorer le catalogue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
