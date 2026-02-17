'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion des Produits</h1>
        <Link href="/admin/products/add">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Ajouter Produit
          </Button>
        </Link>
      </div>

      {/* Products Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">Nom</th>
                <th className="text-left px-6 py-3 font-semibold">Catégorie</th>
                <th className="text-left px-6 py-3 font-semibold">Prix de Base</th>
                <th className="text-left px-6 py-3 font-semibold">Stock</th>
                <th className="text-left px-6 py-3 font-semibold">Commande Min</th>
                <th className="text-left px-6 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr
                  key={product.id}
                  className="border-b border-border hover:bg-secondary/50 transition"
                >
                  <td className="px-6 py-4 font-semibold">{product.name}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">${product.basePrice.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={product.stock < 100 ? 'text-amber-600 font-semibold' : ''}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">{product.minOrder}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingId(product.id)}
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border border-border rounded-lg p-4 bg-card hover:border-primary/50 transition">
          <p className="text-foreground/70 text-sm mb-1">Produits Totaux</p>
          <p className="text-2xl font-bold">{products.length}</p>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card hover:border-primary/50 transition">
          <p className="text-foreground/70 text-sm mb-1">Articles Faible Stock</p>
          <p className="text-2xl font-bold text-amber-600">
            {products.filter(p => p.stock < 100).length}
          </p>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card hover:border-primary/50 transition">
          <p className="text-foreground/70 text-sm mb-1">Prix Moyen</p>
          <p className="text-2xl font-bold">
            ${(products.reduce((sum, p) => sum + p.basePrice, 0) / products.length).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
