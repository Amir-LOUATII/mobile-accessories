import { DollarSign, TrendingUp, Truck } from "lucide-react";

const FEATURES = [
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
];
export default function FeaturesSection() {
    return  <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-secondary/30">
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
                  {FEATURES.map((feature, idx) => (
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
}