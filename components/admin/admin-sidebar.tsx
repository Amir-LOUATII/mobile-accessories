"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  UserPlus,
  LogOut,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Tableau de bord", href: "/admin", icon: BarChart3 },
  { label: "Produits", href: "/admin/products", icon: Package },
  { label: "Commandes", href: "/admin/orders", icon: ShoppingCart },
  { label: "Clients", href: "/admin/customers", icon: Users },
  { label: "Vendeurs", href: "/admin/sellers", icon: UserPlus },
];

interface AdminSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function AdminSidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: AdminSidebarProps) {
  const pathname = usePathname();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  // Close mobile sidebar on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setMobileOpen]);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-50 h-full
          bg-gradient-to-b from-card to-card/95 border-r border-border/50
          flex flex-col shadow-xl lg:shadow-md
          transition-all duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}
          ${collapsed ? "lg:translate-x-0 lg:w-[72px]" : "lg:translate-x-0 lg:w-64"}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center border-b border-border/50 px-4 flex-shrink-0">
          <Link
            href="/admin"
            className="flex items-center gap-3 overflow-hidden"
          >
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-black text-sm flex-shrink-0">
              VG
            </div>
            <span
              className={`font-bold text-lg whitespace-nowrap transition-all duration-300 ${
                collapsed ? "lg:opacity-0 lg:w-0" : "lg:opacity-100 lg:w-auto"
              }`}
            >
              Admin
            </span>
          </Link>

          {/* Mobile close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto p-1.5 hover:bg-secondary rounded-lg transition lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`
                  flex items-center gap-3 rounded-xl transition-all duration-200
                  ${collapsed ? "lg:justify-center lg:px-0 px-3 py-3" : "px-3 py-3"}
                  ${
                    active
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "text-foreground/70 hover:bg-secondary/80 hover:text-foreground"
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span
                  className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    collapsed ? "lg:hidden" : ""
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border/50 flex-shrink-0 space-y-2">
          {/* Collapse toggle (desktop only) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-full items-center justify-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/80 rounded-xl transition-all"
          >
            {collapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <>
                <PanelLeftClose className="w-4 h-4" />
                <span>Réduire</span>
              </>
            )}
          </button>

          {/* Exit admin */}
          <Link href="/">
            <Button
              variant="outline"
              className={`w-full rounded-xl gap-2 ${
                collapsed ? "lg:px-0" : ""
              }`}
              size="sm"
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span
                className={`transition-all duration-300 ${
                  collapsed ? "lg:hidden" : ""
                }`}
              >
                Quitter Admin
              </span>
            </Button>
          </Link>
        </div>
      </aside>
    </>
  );
}
