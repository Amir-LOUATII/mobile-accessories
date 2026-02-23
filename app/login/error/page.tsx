"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Suspense } from "react";

const ERROR_MESSAGES: Record<string, string> = {
  AccessDenied:
    "Cet email n'est pas autorisé à se connecter. Contactez votre administrateur.",
  Verification: "Le lien de connexion a expiré ou est invalide.",
  Configuration: "Erreur de configuration du serveur.",
  Default: "Une erreur de connexion est survenue.",
};

function ErrorContent() {
  const searchParams = useSearchParams();
  const errorType = searchParams.get("error") || "Default";
  const message = ERROR_MESSAGES[errorType] || ERROR_MESSAGES.Default;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Retour au site
        </Link>

        <div className="bg-card border border-border/50 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black">Erreur de connexion</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {message}
            </p>
          </div>

          <Link href="/login">
            <Button className="w-full rounded-xl gap-2" size="lg">
              Réessayer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginErrorPage() {
  return (
    <Suspense>
      <ErrorContent />
    </Suspense>
  );
}
