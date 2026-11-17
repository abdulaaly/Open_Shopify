"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingBag,
  Package,
  Users,
  BarChart3,
  Tag,
  Palette,
  Settings,
  Store,
  ChevronDown,
} from "lucide-react";
import { cn } from "@vendr/ui";

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const [storeName, setStoreName] = useState("Apex Apparel");
  const [storeSlug, setStoreSlug] = useState("apex-apparel");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const slug = new URLSearchParams(window.location.search).get("tenant") || "apex-apparel";
      setStoreSlug(slug);

      fetch(`http://localhost:4000/api/v1/store?tenant=${slug}`)
        .then((res) => res.json())
        .then((d) => {
          if (d && d.name) setStoreName(d.name);
        })
        .catch(() => {});
    }
  }, []);

  const navigationItems = [
    { name: "Home", href: `/?tenant=${storeSlug}`, icon: Home },
    { name: "Orders", href: `/orders?tenant=${storeSlug}`, icon: ShoppingBag, badge: "Live" },
    { name: "Products", href: `/products?tenant=${storeSlug}`, icon: Package },
    { name: "Customers", href: `/customers?tenant=${storeSlug}`, icon: Users },
    { name: "Analytics", href: `/analytics?tenant=${storeSlug}`, icon: BarChart3 },
    { name: "Discounts", href: `/discounts?tenant=${storeSlug}`, icon: Tag },
    { name: "Theme Editor", href: `http://localhost:3002?tenant=${storeSlug}`, icon: Palette, external: true },
    { name: "Settings", href: `/settings?tenant=${storeSlug}`, icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0 h-screen sticky top-0 select-none">
      {/* Store Branding Header */}
      <div className="h-14 border-b border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
            <img src="/assets/branding/openshopify-icon.svg" alt="Open Shopify" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col truncate">
            <span className="font-bold text-xs tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1 truncate">
              {storeName}
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono truncate">
              {storeSlug}.openshopify.local
            </span>
          </div>
        </div>
        <Link
          href={`http://localhost:3000?tenant=${storeSlug}`}
          target="_blank"
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 shrink-0"
          title="View live storefront"
        >
          <Store className="w-4 h-4" />
        </Link>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href.split("?")[0];
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              className={cn(
                "flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors",
                isActive
                  ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={cn("w-4 h-4", isActive ? "text-emerald-600" : "text-slate-400")} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.5 rounded-full text-[10px] font-semibold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Merchant Profile */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-emerald-600 shrink-0">
          <img src="/assets/branding/avatar-elena.svg" alt="Admin" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col truncate">
          <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
            Merchant Admin
          </span>
          <span className="text-[10px] text-slate-400 font-mono truncate">
            admin@{storeSlug}.co
          </span>
        </div>
      </div>
    </aside>
  );
};
