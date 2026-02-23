import { Package, Star, TrendingUp, Truck } from "lucide-react";

const TRUST_STATS = [
  { value: "2 500+", label: "Références", icon: Package },
  { value: "500+", label: "Revendeurs Actifs", icon: TrendingUp },
  { value: "24h", label: "Expédition", icon: Truck },
  { value: "98%", label: "Satisfaction", icon: Star },
];
export default function TrustStatsBar() {
    return (
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
    )
}   