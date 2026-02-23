"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft, Loader2, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("resend", {
        email,
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        setError(
          "Cet email n'est pas autorisé. Contactez votre administrateur."
        );
      } else {
        // Redirect to verify page
        window.location.href = `/login/verify?email=${encodeURIComponent(email)}`;
      }
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Retour au site
        </Link>

        {/* Card */}
        <div className="bg-card border border-border/50 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">Connexion</h1>
            <p className="text-sm text-muted-foreground">
              Entrez votre adresse email pour recevoir un lien de connexion
              sécurisé.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@entreprise.com"
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border/60 rounded-xl text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full rounded-xl shadow-lg shadow-primary/25 gap-2"
              size="lg"
              disabled={loading || !email}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Envoyer le lien magique
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-xs text-center text-muted-foreground leading-relaxed">
            Seuls les comptes créés par un administrateur peuvent se connecter.
            <br />
            Pas de compte ?{" "}
            <span className="text-primary font-medium">
              Contactez votre administrateur
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
