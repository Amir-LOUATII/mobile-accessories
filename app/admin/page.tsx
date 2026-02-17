'use client';

import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';

export default function AdminDashboard() {
  const totalRevenue = 125430;
  const totalOrders = 284;
  const totalCustomers = 156;
  const totalProducts = MOCK_PRODUCTS.length;

  const stats = [
    {
      label: 'Revenu Total',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-primary',
    },
    {
      label: 'Commandes Totales',
      value: totalOrders,
      icon: ShoppingCart,
      color: 'text-blue-500',
    },
    {
      label: 'Clients Totaux',
      value: totalCustomers,
      icon: Users,
      color: 'text-green-500',
    },
    {
      label: 'Produits Totaux',
      value: totalProducts,
      icon: Package,
      color: 'text-purple-500',
    },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'Acme Corp', amount: 2450, status: 'Expédié' },
    { id: 'ORD-002', customer: 'TechStart Inc', amount: 5200, status: 'En cours' },
    { id: 'ORD-003', customer: 'BuildRight LLC', amount: 3100, status: 'En attente' },
    { id: 'ORD-004', customer: 'Global Supplies', amount: 4850, status: 'Livré' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="border border-border rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-foreground/70 text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 bg-secondary rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-secondary p-6 border-b border-border">
          <h2 className="text-xl font-bold">Commandes Récentes</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">ID Commande</th>
                <th className="text-left px-6 py-3 font-semibold">Client</th>
                <th className="text-left px-6 py-3 font-semibold">Montant</th>
                <th className="text-left px-6 py-3 font-semibold">Statut</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr
                  key={order.id}
                  className="border-b border-border hover:bg-secondary/50 transition"
                >
                  <td className="px-6 py-4 font-semibold">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4 font-semibold">${order.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === 'Livré'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Expédié'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'En cours'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Products */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-secondary p-6 border-b border-border">
          <h2 className="text-xl font-bold">Meilleurs Produits</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">Nom du Produit</th>
                <th className="text-left px-6 py-3 font-semibold">Catégorie</th>
                <th className="text-left px-6 py-3 font-semibold">Stock</th>
                <th className="text-left px-6 py-3 font-semibold">Prix</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PRODUCTS.slice(0, 5).map(product => (
                <tr
                  key={product.id}
                  className="border-b border-border hover:bg-secondary/50 transition"
                >
                  <td className="px-6 py-4 font-semibold">{product.name}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4 font-semibold">${product.basePrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
