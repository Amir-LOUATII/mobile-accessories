'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Header() {
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-border sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm md:text-lg">VG</span>
            </div>
            <span className="font-bold text-sm md:text-lg hidden sm:inline text-foreground">Vente Gros</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="/" className="text-sm text-foreground hover:text-primary transition">
              Accueil
            </Link>
            <Link href="/products" className="text-sm text-foreground hover:text-primary transition">
              Produits
            </Link>
            <Link href="/about" className="text-sm text-foreground hover:text-primary transition">
              À propos
            </Link>
            <Link href="/admin" className="text-sm text-foreground hover:text-primary transition font-medium">
              Admin
            </Link>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg hover:bg-secondary transition"
            >
              <ShoppingCart className="w-4 md:w-5 h-4 md:h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border py-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-2 hover:bg-secondary rounded-lg transition"
            >
              Accueil
            </Link>
            <Link
              href="/products"
              className="block px-4 py-2 hover:bg-secondary rounded-lg transition"
            >
              Produits
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 hover:bg-secondary rounded-lg transition"
            >
              À propos
            </Link>
            <Link
              href="/admin"
              className="block px-4 py-2 hover:bg-secondary rounded-lg transition font-medium"
            >
              Admin
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
