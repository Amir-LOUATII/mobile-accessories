"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Suspense } from "react";

function VerifyContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Back */}
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Retour à la connexion
        </Link>

        {/* Card */}
        <div className="bg-card border border-border/50 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black">
              Vérifiez votre email
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Un lien de connexion a été envoyé à
            </p>
            {email && (
              <p className="text-sm font-semibold text-primary">{email}</p>
            )}
          </div>

          <div className="bg-secondary/50 rounded-xl p-4 space-y-3 text-left">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cliquez sur le lien dans l&apos;email pour vous connecter. Le
                lien expire dans <strong>24 heures</strong>.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Vérifiez votre dossier <strong>spam</strong> si vous ne voyez
                pas l&apos;email.
              </p>
            </div>
          </div>

          <Link
            href="/login"
            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Renvoyer le lien
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyContent />
    </Suspense>
  );
}
