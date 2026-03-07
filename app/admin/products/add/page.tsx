'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { getCategories, createProduct } from '@/app/actions/products';

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function AddProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    description: '',
    basePrice: '',
    minOrder: '1',
    stock: '0',
    image: '',
    badge: '',
  });

  const [wholesaleTiers, setWholesaleTiers] = useState([
    { quantity: '', price: '' },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch categories
  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories((data.categories as Category[]) || []);
        if (data.categories?.length > 0 && !formData.categoryId) {
          setFormData((prev) => ({ ...prev, categoryId: data.categories[0].id.toString() }));
        }
      })
      .catch(() => {});
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleTierChange = (index: number, field: 'quantity' | 'price', value: string) => {
    const newTiers = [...wholesaleTiers];
    newTiers[index] = { ...newTiers[index], [field]: value };
    setWholesaleTiers(newTiers);
  };

  const addTier = () => {
    setWholesaleTiers([...wholesaleTiers, { quantity: '', price: '' }]);
  };

  const removeTier = (index: number) => {
    setWholesaleTiers(wholesaleTiers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.basePrice || !formData.categoryId || !formData.description) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await createProduct({
        ...formData,
        tiers: wholesaleTiers.filter((t) => t.quantity && t.price),
      });

      if (res.error) {
        setErrorMessage(res.error);
        return;
      }

      setShowSuccess(true);
      setTimeout(() => router.push('/admin/products'), 1500);
    } catch {
      setErrorMessage('Erreur de connexion.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-2">
      {/* Header */}
      <div className="mb-8">
        <Link href="/admin/products" className="flex items-center gap-2 text-primary hover:text-primary/80 transition mb-4">
          <ArrowLeft className="w-4 h-4" />
          Retour aux Produits
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Ajouter un Nouveau Produit</h1>
        <p className="text-foreground/70">Remplissez les détails du nouveau produit en gros</p>
      </div>

      {/* Success */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl text-green-800 font-medium">
          ✅ Produit créé avec succès ! Redirection…
        </div>
      )}

      {/* Error */}
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl text-red-800 font-medium">
          ⚠️ {errorMessage}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="border border-border rounded-xl p-6 space-y-4 bg-card">
          <h2 className="text-xl font-bold">Informations Générales</h2>

          <div>
            <label className="block text-sm font-medium mb-2">Nom du Produit *</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="ex: Coque iPhone 15 Premium"
              required
              disabled={isSubmitting || showSuccess}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Catégorie *</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                disabled={isSubmitting || showSuccess}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
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
                disabled={isSubmitting || showSuccess}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description du produit"
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground font-inherit"
              disabled={isSubmitting || showSuccess}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Badge (optionnel)</label>
            <select
              name="badge"
              value={formData.badge}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              disabled={isSubmitting || showSuccess}
            >
              <option value="">Aucun</option>
              <option value="Best-seller">Best-seller</option>
              <option value="Nouveau">Nouveau</option>
              <option value="Populaire">Populaire</option>
              <option value="Volume">Volume</option>
              <option value="Tendance">Tendance</option>
              <option value="Pro">Pro</option>
            </select>
          </div>
        </div>

        {/* Pricing */}
        <div className="border border-border rounded-xl p-6 space-y-4 bg-card">
          <h2 className="text-xl font-bold">Tarification</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Prix de Base (TND) *</label>
              <Input
                type="number"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleInputChange}
                placeholder="10.00"
                step="0.01"
                required
                disabled={isSubmitting || showSuccess}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Commande Minimale</label>
              <Input
                type="number"
                name="minOrder"
                value={formData.minOrder}
                onChange={handleInputChange}
                placeholder="1"
                min="1"
                disabled={isSubmitting || showSuccess}
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
                  disabled={isSubmitting || showSuccess}
                />
                <Input
                  type="number"
                  placeholder="Prix (TND)"
                  value={tier.price}
                  onChange={(e) => handleTierChange(index, 'price', e.target.value)}
                  step="0.01"
                  className="flex-1"
                  disabled={isSubmitting || showSuccess}
                />
                {wholesaleTiers.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeTier(index)}
                    className="text-destructive"
                    disabled={isSubmitting || showSuccess}
                  >
                    Supprimer
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addTier} className="w-full" disabled={isSubmitting || showSuccess}>
              Ajouter un Tier
            </Button>
          </div>
        </div>

        {/* Stock */}
        <div className="border border-border rounded-xl p-6 space-y-4 bg-card">
          <h2 className="text-xl font-bold">Inventaire</h2>
          <div>
            <label className="block text-sm font-medium mb-2">Quantité en Stock</label>
            <Input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              disabled={isSubmitting || showSuccess}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button type="submit" className="gap-2" disabled={isSubmitting || showSuccess}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Création…
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Créer le Produit
              </>
            )}
          </Button>
          <Link href="/admin/products">
            <Button type="button" variant="outline" disabled={isSubmitting || showSuccess}>
              Annuler
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
