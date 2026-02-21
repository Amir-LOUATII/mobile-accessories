'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X, Smartphone } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Header() {
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="glass border-b border-border/50 sticky top-0 z-40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              <Smartphone className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-base md:text-lg leading-tight tracking-tight text-foreground">
                MobileGros
              </span>
              <span className="text-[10px] md:text-xs text-muted-foreground leading-tight -mt-0.5">
                Accessoires en gros
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: '/', label: 'Accueil' },
              { href: '/products', label: 'Produits' },
              { href: '/about', label: 'À propos' },
              { href: '/admin', label: 'Admin' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-primary/5 transition-all duration-200 group"
            >
              <ShoppingCart className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 shadow-md animate-fade-in">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 hover:bg-primary/5 rounded-xl transition-all duration-200"
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
          <nav className="md:hidden border-t border-border/50 py-3 space-y-1 animate-slide-up">
            {[
              { href: '/', label: 'Accueil' },
              { href: '/products', label: 'Produits' },
              { href: '/about', label: 'À propos' },
              { href: '/admin', label: 'Admin' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 hover:bg-primary/5 rounded-xl text-sm font-medium transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
