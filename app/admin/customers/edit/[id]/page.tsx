"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, User, Building2, Mail, Loader2 } from "lucide-react";
import { getCustomerById, updateCustomer } from "@/app/actions/customers";
import { toast } from "sonner";

export default function EditCustomerPage() {
  const params = useParams(); 
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    async function loadCustomer() {
      setIsLoading(true);
      const res = await getCustomerById(params.id);
      if (res.error) {
        setErrorMessage(res.error);
        toast.error(res.error);
      } else if (res.customer) {
        setFormData({
          name: res.customer.name || "",
          company: res.customer.company || "",
          email: res.customer.email || "",
          phone: res.customer.phone || "",
        });
      }
      setIsLoading(false);
    }
    loadCustomer();
  }, [params.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setErrorMessage("Le nom et l'email sont obligatoires");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const res = await updateCustomer(params.id, {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
    });

    setIsSubmitting(false);

    if (res.error) {
      setErrorMessage(res.error);
      toast.error(res.error);
    } else {
      toast.success("Client mis à jour avec succès");
      router.push("/admin/customers");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Chargement…</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-2">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/customers"
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux Clients
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Modifier le Client</h1>
        <p className="text-foreground/70">
          Mettez à jour les informations du client existant.
        </p>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl text-red-800 font-medium">
          ⚠️ {errorMessage}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="border border-border rounded-xl p-6 space-y-4 bg-card">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Informations Personnelles</h2>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Nom Complet *</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="ex: Jean Dupont"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <div className="flex gap-2 items-center">
              <Mail className="w-4 h-4 text-foreground/50" />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="flex-1"
                disabled={isSubmitting}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Note : le client utilisera cette adresse pour recevoir ses liens de connexion.
            </p>
          </div>
        </div>

        {/* Company Information */}
        <div className="border border-border rounded-xl p-6 space-y-4 bg-card">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Informations Entreprise & Contact</h2>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Entreprise/Société</label>
            <Input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="ex: ACME Corporation"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Téléphone</label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="(555) 123-4567"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4">
          <Button type="submit" className="gap-2" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Mise à jour en cours…
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Enregistrer les modifications
              </>
            )}
          </Button>
          <Link href="/admin/customers">
            <Button type="button" variant="outline" disabled={isSubmitting}>
              Annuler
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
