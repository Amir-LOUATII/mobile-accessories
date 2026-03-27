import { Header } from "@/components/header";
import { Heart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function FavoritesLoading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background border-t border-border/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Page Header */}
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500 opacity-50 pulse" />
              <Skeleton className="h-8 w-48" />
            </h1>
            <Skeleton className="h-4 w-72" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6 mt-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 bg-card border border-border/50 rounded-2xl p-4"
              >
                <Skeleton className="w-full aspect-[4/3] rounded-xl" />
                <div className="space-y-3 mt-2">
                  <Skeleton className="w-3/4 h-5" />
                  <Skeleton className="w-1/2 h-4" />
                </div>
                <div className="flex gap-2 mt-auto pt-4">
                  <Skeleton className="w-1/3 h-6" />
                  <Skeleton className="w-1/4 h-6 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
