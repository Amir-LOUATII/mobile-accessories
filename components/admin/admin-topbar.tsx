"use client";

import { Menu } from "lucide-react";

interface AdminTopbarProps {
  onOpenMobile: () => void;
}

export function AdminTopbar({ onOpenMobile }: AdminTopbarProps) {
  return (
    <header className="h-16 bg-card border-b border-border/50 px-4 sm:px-6 flex items-center gap-4 flex-shrink-0">
      {/* Mobile menu button */}
      <button
        onClick={onOpenMobile}
        className="p-2 hover:bg-secondary/80 rounded-xl transition lg:hidden"
      >
        <Menu className="w-5 h-5" />
      </button>

      <h1 className="text-base sm:text-lg md:text-xl font-bold truncate">
        Panneau d&apos;Administration
      </h1>
    </header>
  );
}
