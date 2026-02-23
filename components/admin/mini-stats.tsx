interface MiniStat {
  label: string;
  value: string | number;
  color?: string;
}

interface MiniStatsProps {
  stats: MiniStat[];
  columns?: number;
}

export function MiniStats({ stats, columns = 3 }: MiniStatsProps) {
  const gridCols =
    columns === 4
      ? "grid-cols-2 md:grid-cols-4"
      : "grid-cols-3";

  return (
    <div className={`grid ${gridCols} gap-3 sm:gap-4`}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border border-border rounded-xl p-3 sm:p-4 bg-card hover:border-primary/50 transition"
        >
          <p className="text-foreground/70 text-xs sm:text-sm mb-1">
            {stat.label}
          </p>
          <p
            className={`text-lg sm:text-2xl font-bold ${stat.color || ""}`}
          >
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
