'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function AdminCustomersPage() {
  const customers = [
    {
      id: 'CUST-001',
      name: 'John Smith',
      company: 'Acme Corp',
      email: 'john@acme.com',
      phone: '(555) 123-4567',
      orders: 12,
      totalSpent: 24500,
      joinDate: '2023-06-15',
      status: 'Actif',
    },
    {
      id: 'CUST-002',
      name: 'Sarah Johnson',
      company: 'TechStart Inc',
      email: 'sarah@techstart.com',
      phone: '(555) 234-5678',
      orders: 8,
      totalSpent: 18200,
      joinDate: '2023-09-20',
      status: 'Actif',
    },
    {
      id: 'CUST-003',
      name: 'Michael Chen',
      company: 'BuildRight LLC',
      email: 'michael@buildright.com',
      phone: '(555) 345-6789',
      orders: 15,
      totalSpent: 32100,
      joinDate: '2023-03-10',
      status: 'Actif',
    },
    {
      id: 'CUST-004',
      name: 'Emily Rodriguez',
      company: 'Global Supplies',
      email: 'emily@globalsupplies.com',
      phone: '(555) 456-7890',
      orders: 20,
      totalSpent: 48500,
      joinDate: '2022-11-05',
      status: 'Actif',
    },
    {
      id: 'CUST-005',
      name: 'David Martinez',
      company: 'Premium Retail',
      email: 'david@premiumretail.com',
      phone: '(555) 567-8901',
      orders: 5,
      totalSpent: 12300,
      joinDate: '2024-01-12',
      status: 'Actif',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion des Clients</h1>
        <Link href="/admin/customers/add">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Ajouter Client
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="border border-border rounded-lg p-4 bg-card hover:border-primary/50 transition">
          <p className="text-foreground/70 text-sm mb-1">Clients Totaux</p>
          <p className="text-2xl font-bold">{customers.length}</p>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card hover:border-primary/50 transition">
          <p className="text-foreground/70 text-sm mb-1">Clients Actifs</p>
          <p className="text-2xl font-bold text-green-600">
            {customers.filter(c => c.status === 'Actif').length}
          </p>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card hover:border-primary/50 transition">
          <p className="text-foreground/70 text-sm mb-1">Commandes Moyennes</p>
          <p className="text-2xl font-bold">
            {(customers.reduce((sum, c) => sum + c.orders, 0) / customers.length).toFixed(1)}
          </p>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card hover:border-primary/50 transition">
          <p className="text-foreground/70 text-sm mb-1">Total Dépensé</p>
          <p className="text-2xl font-bold">
            ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Customers Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">Nom</th>
                <th className="text-left px-6 py-3 font-semibold">Entreprise</th>
                <th className="text-left px-6 py-3 font-semibold">Email</th>
                <th className="text-left px-6 py-3 font-semibold">Commandes</th>
                <th className="text-left px-6 py-3 font-semibold">Total Dépensé</th>
                <th className="text-left px-6 py-3 font-semibold">Statut</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr
                  key={customer.id}
                  className="border-b border-border hover:bg-secondary/50 transition"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold">{customer.name}</p>
                      <p className="text-sm text-foreground/60">{customer.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{customer.company}</td>
                  <td className="px-6 py-4 text-sm text-foreground/70">{customer.email}</td>
                  <td className="px-6 py-4 font-semibold">{customer.orders}</td>
                  <td className="px-6 py-4 font-semibold">${customer.totalSpent.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                      {customer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
