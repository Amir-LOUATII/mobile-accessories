import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight, CheckCircle, Package, Shield, Truck } from "lucide-react";
const BADGES = [
    { icon: CheckCircle, text: "Inscription gratuite" },
    { icon: Shield, text: "Paiement sécurisé" },
    { icon: Truck, text: "Livraison 24h" },
    { icon: Package, text: "Retours simplifiés" },
];
export function CtaSection() {
    return   <section className="relative overflow-hidden">
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
              {BADGES.map((badge) => (
                <span key={badge.text} className="flex items-center gap-1.5">
                  <badge.icon className="w-4 h-4" /> {badge.text}
                </span>
              ))}
            </div>
          </div>
        </section>
}