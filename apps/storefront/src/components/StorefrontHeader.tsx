"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Search, ExternalLink } from "lucide-react";
import { useCart } from "./CartContext";

export const StorefrontHeader: React.FC = () => {
  const { totalCount, setIsOpen } = useCart();
  const [storeName, setStoreName] = useState("APEX APPAREL");
  const [tenantSlug, setTenantSlug] = useState("apex-apparel");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const slug = new URLSearchParams(window.location.search).get("tenant") || "apex-apparel";
      setTenantSlug(slug);

      fetch(`http://localhost:4000/api/v1/store?tenant=${slug}`)
        .then((res) => res.json())
        .then((d) => {
          if (d && d.name) setStoreName(d.name.toUpperCase());
        })
        .catch(() => {});
    }
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/?tenant=${tenantSlug}`} className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
            <img src="/assets/branding/openshopify-icon.svg" alt="Open Shopify" className="w-full h-full object-contain" />
          </div>
          <span className="font-black text-sm tracking-widest text-slate-900">
            {storeName}
          </span>
        </Link>

        {/* Center Categories */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
          <Link href={`/?tenant=${tenantSlug}`} className="hover:text-emerald-600 transition-colors">
            All Products
          </Link>
          <a
            href="http://localhost:3003"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-600 transition-colors"
          >
            Open Shopify Home
          </a>
          <a
            href={`http://localhost:3001?tenant=${tenantSlug}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-600 transition-colors flex items-center gap-1 text-emerald-600"
          >
            <span>Merchant Admin</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-emerald-600 text-white rounded-full text-xs font-bold transition-all shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Cart</span>
            {totalCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-black flex items-center justify-center text-[10px] font-black">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
