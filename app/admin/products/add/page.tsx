'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save } from 'lucide-react';

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Mobilier',
    description: '',
    basePrice: '',
    minOrder: '',
    stock: '',
    image: '',
  });

  const [wholesaleTiers, setWholesaleTiers] = useState([
    { quantity: '', price: '' },
  ]);

  const [showSuccess, setShowSuccess] = useState(false);

  const categories = ['Mobilier', 'Technologie', 'Éclairage', 'Accessoires'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTierChange = (index: number, field: 'quantity' | 'price', value: string) => {
    const newTiers = [...wholesaleTiers];
    newTiers[index] = {
      ...newTiers[index],
      [field]: value,
    };
    setWholesaleTiers(newTiers);
  };

  const addTier = () => {
    setWholesaleTiers([...wholesaleTiers, { quantity: '', price: '' }]);
  };

  const removeTier = (index: number) => {
    setWholesaleTiers(wholesaleTiers.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.basePrice || !formData.stock) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Show success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Reset form
      setFormData({
        name: '',
        category: 'Mobilier',
        description: '',
        basePrice: '',
        minOrder: '',
        stock: '',
        image: '',
      });
      setWholesaleTiers([{ quantity: '', price: '' }]);
    }, 2000);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin/products" className="flex items-center gap-2 text-primary hover:text-primary/80 transition mb-4">
              <ArrowLeft className="w-4 h-4" />
              Retour aux Produits
            </Link>
            <h1 className="text-3xl font-bold mb-2">Ajouter un Nouveau Produit</h1>
            <p className="text-foreground/70">Remplissez les détails du nouveau produit en gros</p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
              Produit créé avec succès!
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-bold">Informations Générales</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2">Nom du Produit *</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="ex: Chaise de Bureau Premium"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Catégorie *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <Input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description du produit"
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground font-inherit"
                />
              </div>
            </div>

            {/* Pricing Information */}
            <div className="border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-bold">Tarification</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Prix de Base ($) *</label>
                  <Input
                    type="number"
                    name="basePrice"
                    value={formData.basePrice}
                    onChange={handleInputChange}
                    placeholder="100.00"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Commande Minimale *</label>
                  <Input
                    type="number"
                    name="minOrder"
                    value={formData.minOrder}
                    onChange={handleInputChange}
                    placeholder="5"
                    min="1"
                  />
                </div>
              </div>

              {/* Wholesale Tiers */}
              <div className="space-y-3">
                <label className="block text-sm font-medium">Tarification en Gros</label>
                {wholesaleTiers.map((tier, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Quantité"
                      value={tier.quantity}
                      onChange={(e) => handleTierChange(index, 'quantity', e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      placeholder="Prix ($)"
                      value={tier.price}
                      onChange={(e) => handleTierChange(index, 'price', e.target.value)}
                      step="0.01"
                      className="flex-1"
                    />
                    {wholesaleTiers.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeTier(index)}
                        className="text-destructive"
                      >
                        Supprimer
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addTier}
                  className="w-full"
                >
                  Ajouter un Tier
                </Button>
              </div>
            </div>

            {/* Stock Information */}
            <div className="border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-bold">Inventaire</h2>

              <div>
                <label className="block text-sm font-medium mb-2">Quantité en Stock *</label>
                <Input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="500"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4">
              <Button type="submit" className="gap-2">
                <Save className="w-4 h-4" />
                Créer le Produit
              </Button>
              <Link href="/admin/products">
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
