"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, Search } from "lucide-react";
import { useCart } from "./CartContext";

export const StorefrontHeader: React.FC = () => {
  const { totalCount, setIsOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            V
          </div>
          <span className="font-bold text-sm tracking-widest text-slate-900">
            APEX APPAREL
          </span>
        </Link>

        {/* Center Categories */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-600">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            All Collections
          </Link>
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Outerwear
          </Link>
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Heavyweight Tops
          </Link>
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Japanese Denim
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-md"
            title="Search catalog"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-xs font-medium transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Cart</span>
            {totalCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
