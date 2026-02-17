'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, User, Building2, Mail, Phone } from 'lucide-react';

export default function AddCustomerPage() {
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
    status: 'Actif',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.company) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Show success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        status: 'Actif',
      });
    }, 2000);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin/customers" className="flex items-center gap-2 text-primary hover:text-primary/80 transition mb-4">
              <ArrowLeft className="w-4 h-4" />
              Retour aux Clients
            </Link>
            <h1 className="text-3xl font-bold mb-2">Ajouter un Nouveau Client</h1>
            <p className="text-foreground/70">Enregistrer un nouveau client en gros</p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
              Client créé avec succès!
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="border border-border rounded-lg p-6 space-y-4">
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
                  />
                </div>
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
                  />
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className="border border-border rounded-lg p-6 space-y-4">
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
                  />
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-bold">Statut</h2>

              <div>
                <label className="block text-sm font-medium mb-2">Statut du Client</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                >
                  <option value="Actif">Actif</option>
                  <option value="Inactif">Inactif</option>
                  <option value="Suspendu">Suspendu</option>
                </select>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4">
              <Button type="submit" className="gap-2">
                <Save className="w-4 h-4" />
                Créer le Client
              </Button>
              <Link href="/admin/customers">
                <Button type="button" variant="outline">
                  Annuler
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
