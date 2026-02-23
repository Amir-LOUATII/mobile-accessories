import { LucideIcon } from "lucide-react";

interface Stat {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

interface StatsGridProps {
  stats: Stat[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="border border-border rounded-xl p-4 sm:p-6 hover:shadow-lg transition bg-card"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-foreground/70 text-xs sm:text-sm mb-1 sm:mb-2 truncate">
                  {stat.label}
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold truncate">
                  {stat.value}
                </p>
              </div>
              <div
                className={`p-2 sm:p-3 bg-secondary rounded-lg ${stat.color} flex-shrink-0`}
              >
                <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
