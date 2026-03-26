'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, User, Building2, Mail, Phone, Loader2 } from 'lucide-react';

export default function AddCustomerPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.company) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires (Prénom, Nom, Email, Entreprise)');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/admin/sellers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          company: formData.company || undefined,
          phone: formData.phone || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Une erreur est survenue lors de la création du client');
        return;
      }

      // Show success and redirect
      setShowSuccess(true);
      setTimeout(() => {
        router.push('/admin/customers');
      }, 2000);
    } catch {
      setErrorMessage('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-2">
      {/* Header */}
      <div className="mb-8">
        <Link href="/admin/customers" className="flex items-center gap-2 text-primary hover:text-primary/80 transition mb-4">
          <ArrowLeft className="w-4 h-4" />
          Retour aux Clients
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Ajouter un Nouveau Client / Revendeur</h1>
        <p className="text-foreground/70">
          Créer un compte revendeur. Un email d&apos;invitation avec un lien de connexion sera envoyé automatiquement.
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl text-green-800 font-medium">
          ✅ Client / Revendeur créé avec succès ! Un email d&apos;invitation a été envoyé. Redirection…
        </div>
      )}

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

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Prénom *</label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="ex: Jean"
                required
                disabled={isSubmitting || showSuccess}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nom *</label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="ex: Dupont"
                required
                disabled={isSubmitting || showSuccess}
              />
            </div>
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
                placeholder="jean.dupont@example.com"
                required
                className="flex-1"
                disabled={isSubmitting || showSuccess}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Un lien de connexion (magic link) sera envoyé à cette adresse.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Téléphone</label>
            <div className="flex gap-2 items-center">
              <Phone className="w-4 h-4 text-foreground/50" />
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(555) 123-4567"
                className="flex-1"
                disabled={isSubmitting || showSuccess}
              />
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="border border-border rounded-xl p-6 space-y-4 bg-card">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Informations Entreprise</h2>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Entreprise/Société *</label>
            <Input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="ex: ACME Corporation"
              required
              disabled={isSubmitting || showSuccess}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Adresse</label>
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="ex: 123 Rue de la Paix"
              disabled={isSubmitting || showSuccess}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Ville</label>
              <Input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="ex: Paris"
                disabled={isSubmitting || showSuccess}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Code Postal</label>
              <Input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                placeholder="ex: 75001"
                disabled={isSubmitting || showSuccess}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Pays</label>
              <Input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="ex: France"
                disabled={isSubmitting || showSuccess}
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4">
          <Button type="submit" className="gap-2" disabled={isSubmitting || showSuccess}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Création en cours…
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Créer le Client / Revendeur
              </>
            )}
          </Button>
          <Link href="/admin/customers">
            <Button type="button" variant="outline" disabled={isSubmitting || showSuccess}>
              Annuler
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
