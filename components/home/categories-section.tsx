import { BatteryCharging, Cable, Headphones, Shield, Smartphone, Zap } from "lucide-react";
import Link from "next/link";


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
export default function CategoriesSection() {
    return   <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-background">
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
}