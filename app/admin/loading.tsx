import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <div className="space-y-6 sm:space-y-8 w-full animate-pulse">
      {/* Skeleton for Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[120px] w-full rounded-xl bg-card border border-border" />
        ))}
      </div>

      {/* Skeleton for Recent Orders Table */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-48 rounded-md" />
        <Skeleton className="h-[300px] w-full rounded-xl bg-card border border-border" />
      </div>

      {/* Skeleton for Top Products Table */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-48 rounded-md" />
        <Skeleton className="h-[300px] w-full rounded-xl bg-card border border-border" />
      </div>
    </div>
  );
}
