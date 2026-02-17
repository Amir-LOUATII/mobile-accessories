'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { BarChart3, Package, ShoppingCart, Users, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const adminNavItems = [
    { label: 'Tableau de bord', href: '/admin', icon: BarChart3 },
    { label: 'Produits', href: '/admin/products', icon: Package },
    { label: 'Commandes', href: '/admin/orders', icon: ShoppingCart },
    { label: 'Clients', href: '/admin/customers', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-gradient-to-b from-secondary to-secondary/80 border-r border-secondary/50 transition-all duration-300 overflow-hidden flex flex-col shadow-lg`}
      >
        <div className="p-6 border-b border-secondary/50 bg-secondary/50">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-lg text-foreground">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              VG
            </div>
            <span>Admin</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {adminNavItems.map(item => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/20 transition text-foreground font-medium hover:text-foreground"
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <Link href="/">
            <Button variant="outline" className="w-full gap-2" size="sm">
              <LogOut className="w-4 h-4" />
              Quitter Admin
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-secondary/20 px-6 py-4 flex items-center justify-between shadow-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-secondary/20 rounded-lg transition md:hidden text-foreground"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
          <h1 className="text-xl font-bold ml-auto text-foreground">Panneau d'Administration</h1>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
