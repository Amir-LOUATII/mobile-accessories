"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  UserPlus,
  Mail,
  Building2,
  User,
  Loader2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function AddSellerPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/sellers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors de la création");
        return;
      }

      setSuccess(
        `Vendeur "${name}" créé avec succès ! Un email d'invitation a été envoyé à ${email}.`
      );
      setName("");
      setEmail("");
      setCompany("");
    } catch {
      setError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <Link
          href="/admin/customers"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Retour aux clients
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold">
          Ajouter un vendeur
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Créez un compte vendeur. Le vendeur recevra un email d&apos;invitation
          avec un lien de connexion.
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl px-4 py-3 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-emerald-800 dark:text-emerald-400">
            {success}
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border/50 rounded-2xl p-5 sm:p-6 space-y-5"
      >
        {/* Name */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-foreground flex items-center gap-2"
          >
            <User className="w-4 h-4 text-muted-foreground" />
            Nom complet <span className="text-destructive">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jean Dupont"
            required
            disabled={loading}
            className="w-full px-4 py-3 bg-secondary/50 border border-border/60 rounded-xl text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all disabled:opacity-50"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-muted-foreground" />
            Adresse email <span className="text-destructive">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jean@entreprise.com"
            required
            disabled={loading}
            className="w-full px-4 py-3 bg-secondary/50 border border-border/60 rounded-xl text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all disabled:opacity-50"
          />
        </div>

        {/* Company */}
        <div className="space-y-2">
          <label
            htmlFor="company"
            className="text-sm font-medium text-foreground flex items-center gap-2"
          >
            <Building2 className="w-4 h-4 text-muted-foreground" />
            Entreprise <span className="text-muted-foreground">(optionnel)</span>
          </label>
          <input
            id="company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Nom de l'entreprise"
            disabled={loading}
            className="w-full px-4 py-3 bg-secondary/50 border border-border/60 rounded-xl text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all disabled:opacity-50"
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full sm:w-auto rounded-xl gap-2 shadow-lg shadow-primary/25"
          size="lg"
          disabled={loading || !name || !email}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Création en cours...
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              Créer le vendeur
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
