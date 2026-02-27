'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X, Smartphone, LogIn, LogOut, User, Shield, Store, ChevronDown } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const ROLE_LABELS: Record<string, { label: string; icon: typeof User; color: string }> = {
  admin: { label: 'Administrateur', icon: Shield, color: 'text-red-500 bg-red-500/10' },
  seller: { label: 'Revendeur', icon: Store, color: 'text-blue-500 bg-blue-500/10' },
  customer: { label: 'Client', icon: User, color: 'text-emerald-500 bg-emerald-500/10' },
};

export function Header() {
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const role = session?.user?.role;
  const isAdmin = role === 'admin';
  const isSeller = role === 'seller';
  const canAccessCart = isSeller || isAdmin;
  const isLoggedIn = status === 'authenticated';

  const userName = session?.user?.name || 'Utilisateur';
  const userEmail = session?.user?.email || '';
  const roleInfo = ROLE_LABELS[role || 'customer'] || ROLE_LABELS.customer;
  const RoleIcon = roleInfo.icon;

  // Get initials for avatar
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Build nav links dynamically based on role
  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/products', label: 'Produits' },
    { href: '/about', label: 'À propos' },
    ...(isAdmin ? [{ href: '/admin', label: 'Admin' }] : []),
  ];

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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart, Auth, and Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Cart — only for sellers and admins */}
            {canAccessCart && (
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
            )}

            {/* ── Desktop: User Menu Dropdown ── */}
            <div className="hidden md:block relative" ref={userMenuRef}>
              {isLoggedIn ? (
                <>
                  {/* Avatar trigger button */}
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-primary/5 transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-xs font-bold shadow-md">
                      {initials}
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-foreground/50 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-72 bg-card border border-border/60 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden animate-fade-in z-50">
                      {/* User Info Section */}
                      <div className="px-4 py-4 border-b border-border/50 bg-secondary/30">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-sm font-bold shadow-lg flex-shrink-0">
                            {initials}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-sm text-foreground truncate">
                              {userName}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {userEmail}
                            </p>
                          </div>
                        </div>
                        {/* Role Badge */}
                        <div className="mt-3">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${roleInfo.color}`}>
                            <RoleIcon className="w-3 h-3" />
                            {roleInfo.label}
                          </span>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            signOut({ callbackUrl: '/' });
                          }}
                          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
                        >
                          <LogOut className="w-4 h-4" />
                          Se déconnecter
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  Connexion
                </Link>
              )}
            </div>

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

        {/* ── Mobile Navigation ── */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border/50 py-3 space-y-1 animate-slide-up">
            {/* Mobile User Info Card (when logged in) */}
            {isLoggedIn && (
              <div className="mx-2 mb-3 p-3 rounded-xl bg-secondary/40 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-xs font-bold shadow-md flex-shrink-0">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm text-foreground truncate">{userName}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{userEmail}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0 ${roleInfo.color}`}>
                    <RoleIcon className="w-3 h-3" />
                    {roleInfo.label}
                  </span>
                </div>
              </div>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 hover:bg-primary/5 rounded-xl text-sm font-medium transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile cart link */}
            {canAccessCart && (
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 hover:bg-primary/5 rounded-xl text-sm font-medium transition-all duration-200"
              >
                <ShoppingCart className="w-4 h-4" />
                Panier {itemCount > 0 && `(${itemCount})`}
              </Link>
            )}

            {/* Mobile auth */}
            <div className="border-t border-border/50 mt-2 pt-2">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: '/' });
                  }}
                  className="flex items-center gap-2 w-full px-4 py-3 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl text-sm font-medium text-red-600 transition-all duration-200 text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Se déconnecter
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 hover:bg-primary/5 rounded-xl text-sm font-medium transition-all duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  Connexion
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
