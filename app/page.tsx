import Link from "next/link";
import {
  ArrowRight,
  Truck,
  DollarSign,
  TrendingUp,
  Shield,
  Zap,
  Package,
  Smartphone,
  Headphones,
  Cable,
  BatteryCharging,
  Star,
  CheckCircle,
} from "lucide-react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

const FEATURED_CATEGORIES = [
  {
    name: "Coques & Étuis",
    icon: Smartphone,
    count: "1200+",
    gradient: "from-indigo-500/15 to-violet-500/5",
  },
  {
    name: "Chargeurs",
    icon: Zap,
    count: "450+",
    gradient: "from-amber-500/15 to-orange-500/5",
  },
  {
    name: "Câbles",
    icon: Cable,
    count: "800+",
    gradient: "from-blue-500/15 to-cyan-500/5",
  },
  {
    name: "Audio",
    icon: Headphones,
    count: "350+",
    gradient: "from-purple-500/15 to-fuchsia-500/5",
  },
  {
    name: "Batteries",
    icon: BatteryCharging,
    count: "200+",
    gradient: "from-emerald-500/15 to-green-500/5",
  },
  {
    name: "Protections",
    icon: Shield,
    count: "900+",
    gradient: "from-rose-500/15 to-pink-500/5",
  },
];

const TRUST_STATS = [
  { value: "2 500+", label: "Références", icon: Package },
  { value: "500+", label: "Revendeurs Actifs", icon: TrendingUp },
  { value: "24h", label: "Expédition", icon: Truck },
  { value: "98%", label: "Satisfaction", icon: Star },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero Section ── */}
        <section className="relative overflow-hidden border-b border-border/50">
          {/* Gradient background + soft glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/6 via-background to-background" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/8 rounded-full blur-[120px] -translate-y-1/2" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
            <div className="space-y-7">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
                <Smartphone className="w-3.5 h-3.5" />
                Grossiste Accessoires Mobile
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                Accessoires Mobile
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mt-1">
                  Prix Grossiste
                </span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Coques, chargeurs, câbles et protections premium pour revendeurs.
                Tarification dégressive sur tout le catalogue.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Link href="/products">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto gap-2 rounded-xl px-8 shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-300"
                  >
                    Voir le catalogue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto rounded-xl px-8 hover:bg-primary/5 transition-all duration-300"
                  >
                    En savoir plus
                  </Button>
                </Link>
              </div>

              {/* Compact feature highlights */}
              <div className="flex flex-wrap justify-center gap-4 pt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-primary" /> Expédition 24h
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-primary" /> Prix dégressifs
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-primary" /> Qualité garantie
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust Stats Bar ── */}
        <section className="border-y border-border/50 bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {TRUST_STATS.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 group">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Categories Section ── */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
                Notre gamme
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
                Catégories Populaires
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Explorez notre catalogue complet d&apos;accessoires mobiles pour professionnels
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {FEATURED_CATEGORIES.map((cat) => (
                <Link
                  href="/products"
                  key={cat.name}
                  className="group relative bg-card border border-border/50 rounded-2xl p-6 text-center hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500"
                >
                  <div className={`absolute inset-0 bg-gradient-to-b ${cat.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative">
                    <div className="w-12 h-12 mx-auto bg-secondary rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                      <cat.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <h3 className="text-sm font-bold mb-1">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground">{cat.count} articles</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features Section ── */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
                Nos avantages
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
                Pourquoi MobileGros ?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Une plateforme designed pour maximiser vos marges et simplifier vos approvisionnements
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: DollarSign,
                  title: "Tarification Dégressive",
                  desc: "Plus vous commandez, plus vos prix unitaires baissent. Jusqu'à -60% sur les volumes importants.",
                  highlight: "-60%",
                },
                {
                  icon: Truck,
                  title: "Expédition Express 24h",
                  desc: "Commandes préparées et expédiées sous 24h. Livraison express disponible France entière et Europe.",
                  highlight: "24h",
                },
                {
                  icon: TrendingUp,
                  title: "Support Expert Dédié",
                  desc: "Une équipe d'experts mobile à votre écoute pour vous conseiller sur les tendances et optimiser vos stocks.",
                  highlight: "VIP",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="group bg-card border border-border/50 rounded-2xl p-8 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/15 to-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider text-primary/60 bg-primary/5 px-2.5 py-1 rounded-full">
                      {feature.highlight}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-accent/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(1_0_0/0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,oklch(1_0_0/0.1),transparent_50%)]" />

          <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-20 sm:py-28 space-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Prêt à Booster
              <br />
              Votre Activité ?
            </h2>

            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Rejoignez des centaines de revendeurs qui maximisent leurs
              marges grâce à nos prix grossiste exclusifs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2.5 rounded-xl px-8 text-base w-full sm:w-auto shadow-2xl hover:scale-[1.02] transition-all duration-300"
                >
                  Commencer maintenant
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 text-white/70 text-sm pt-6">
              {[
                { icon: CheckCircle, text: "Inscription gratuite" },
                { icon: Shield, text: "Paiement sécurisé" },
                { icon: Truck, text: "Livraison 24h" },
                { icon: Package, text: "Retours simplifiés" },
              ].map((badge) => (
                <span key={badge.text} className="flex items-center gap-1.5">
                  <badge.icon className="w-4 h-4" /> {badge.text}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="bg-card border-t border-border/50 py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-10 mb-10">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-md">
                    <Smartphone className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <span className="font-black text-lg">MobileGros</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Votre partenaire grossiste pour les accessoires mobiles. Qualité, prix compétitifs et service professionnel.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-xs uppercase tracking-wider text-foreground/70">Entreprise</h4>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li>
                    <Link href="/about" className="hover:text-primary transition-colors duration-200">
                      À propos
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-primary transition-colors duration-200">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-primary transition-colors duration-200">
                      Recrutement
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-xs uppercase tracking-wider text-foreground/70">Produits</h4>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li>
                    <Link href="/products" className="hover:text-primary transition-colors duration-200">
                      Catalogue
                    </Link>
                  </li>
                  <li>
                    <Link href="/products" className="hover:text-primary transition-colors duration-200">
                      Nouveautés
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-primary transition-colors duration-200">
                      Promotions
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-xs uppercase tracking-wider text-foreground/70">Assistance</h4>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li>
                    <Link href="/" className="hover:text-primary transition-colors duration-200">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-primary transition-colors duration-200">
                      Conditions Générales
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-primary transition-colors duration-200">
                      Politique de Retour
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-sm">
                © 2026 MobileGros. Tous droits réservés.
              </p>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary transition-colors duration-200">
                  Confidentialité
                </Link>
                <Link href="/" className="hover:text-primary transition-colors duration-200">
                  Mentions légales
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
