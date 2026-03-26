import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { UserOrdersList } from "@/components/dashboard/user-orders-list";
import { History, LayoutDashboard } from "lucide-react";
import { Header } from "@/components/header";

export const metadata = {
  title: "Mon Espace | Commande B2B",
  description: "Gérez vos commandes et vos coordonnées.",
};

export default async function DashboardPage() {
  const session = await auth();

  // Protect the route
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        
        {/* ── Welcome Banner ── */}
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black mb-2 flex items-center gap-3">
              <LayoutDashboard className="w-8 h-8 text-primary" />
              Bienvenue, {session.user.name || "Client"} !
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Retrouvez ici l'historique complet de vos achats et le statut de vos commandes en cours.
            </p>
          </div>
        </div>

        {/* ── Main Dashboard Content ── */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <History className="w-6 h-6 text-foreground" />
            <h2 className="text-xl sm:text-2xl font-bold">Mes Commandes</h2>
          </div>
          
          <UserOrdersList />
        </div>

      </div>
    </div>
    </>
  );
}
