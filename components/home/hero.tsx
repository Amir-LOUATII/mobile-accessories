import { ArrowRight, DollarSign, Shield, Smartphone, Truck } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Hero() {
    return  <section className="relative overflow-hidden border-b border-border/50">
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
}