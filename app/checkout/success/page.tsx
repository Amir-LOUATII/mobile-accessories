import Link from "next/link";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

export default function CheckoutSuccessPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center space-y-6 shadow-sm">
        <div className="flex justify-center">
          <CheckCircle2 className="w-20 h-20 text-emerald-500" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Commande validée !</h1>
          <p className="text-muted-foreground text-sm">
            Merci pour votre commande. Elle a été enregistrée avec succès et est actuellement en attente de traitement par notre équipe.
          </p>
        </div>

        <div className="bg-secondary/50 p-4 rounded-xl border border-border/50 text-sm">
          Un email de confirmation vous sera envoyé prochainement avec les détails de votre commande.
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <Link href="/products" className="w-full">
            <Button className="w-full rounded-xl gap-2" size="lg">
              <ShoppingBag className="w-4 h-4" />
              Continuer les achats
            </Button>
          </Link>
          <Link href="/dashboard" className="w-full text-center">
            <Button variant="ghost" className="w-full rounded-xl text-muted-foreground hover:text-foreground">
              Aller au tableau de bord
            </Button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
