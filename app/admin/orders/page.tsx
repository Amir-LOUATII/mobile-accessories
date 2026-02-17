'use client';

import { MOCK_PRODUCTS } from '@/lib/mock-data';

export default function AdminOrdersPage() {
  const orders = [
    {
      id: 'ORD-001',
      customer: 'Acme Corp',
      email: 'orders@acme.com',
      items: 45,
      total: 2450,
      status: 'Expédié',
      date: '2024-02-15',
    },
    {
      id: 'ORD-002',
      customer: 'TechStart Inc',
      email: 'sales@techstart.com',
      items: 120,
      total: 5200,
      status: 'En cours',
      date: '2024-02-14',
    },
    {
      id: 'ORD-003',
      customer: 'BuildRight LLC',
      email: 'procurement@buildright.com',
      items: 35,
      total: 3100,
      status: 'En attente',
      date: '2024-02-14',
    },
    {
      id: 'ORD-004',
      customer: 'Global Supplies',
      email: 'orders@globalsupplies.com',
      items: 200,
      total: 4850,
      status: 'Livré',
      date: '2024-02-13',
    },
    {
      id: 'ORD-005',
      customer: 'Premium Retail',
      email: 'wholesale@premiumretail.com',
      items: 150,
      total: 6200,
      status: 'Livré',
      date: '2024-02-12',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Livré':
        return 'bg-green-100 text-green-800';
      case 'Expédié':
        return 'bg-blue-100 text-blue-800';
      case 'En cours':
        return 'bg-yellow-100 text-yellow-800';
      case 'En attente':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold">Gestion des Commandes</h1>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="border border-border rounded-lg p-4 bg-card hover:border-primary/50 transition">
          <p className="text-foreground/70 text-sm mb-1">Commandes Totales</p>
          <p className="text-2xl font-bold">{orders.length}</p>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card hover:border-primary/50 transition">
          <p className="text-foreground/70 text-sm mb-1">En attente</p>
          <p className="text-2xl font-bold text-yellow-600">
            {orders.filter(o => o.status === 'En attente').length}
          </p>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card hover:border-primary/50 transition">
          <p className="text-foreground/70 text-sm mb-1">Expédié</p>
          <p className="text-2xl font-bold text-blue-600">
            {orders.filter(o => o.status === 'Expédié').length}
          </p>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card hover:border-primary/50 transition">
          <p className="text-foreground/70 text-sm mb-1">Revenu Total</p>
          <p className="text-2xl font-bold">
            ${orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">ID Commande</th>
                <th className="text-left px-6 py-3 font-semibold">Client</th>
                <th className="text-left px-6 py-3 font-semibold">Articles</th>
                <th className="text-left px-6 py-3 font-semibold">Total</th>
                <th className="text-left px-6 py-3 font-semibold">Statut</th>
                <th className="text-left px-6 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr
                  key={order.id}
                  className="border-b border-border hover:bg-secondary/50 transition"
                >
                  <td className="px-6 py-4 font-semibold">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold">{order.customer}</p>
                      <p className="text-sm text-foreground/60">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{order.items}</td>
                  <td className="px-6 py-4 font-semibold">${order.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-foreground/70">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
