"use client";

import React from "react";
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

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Orders", href: "/orders", icon: ShoppingBag, badge: "2" },
  { name: "Products", href: "/products", icon: Package },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Discounts", href: "/discounts", icon: Tag },
  { name: "Theme Editor", href: "http://localhost:3002", icon: Palette, external: true },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0 h-screen sticky top-0 select-none">
      {/* Store Branding Header */}
      <div className="h-14 border-b border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            O
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-xs tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1">
              Apex Apparel <ChevronDown className="w-3 h-3 text-slate-400" />
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
              apex-apparel.openshopify.local
            </span>
          </div>
        </div>
        <Link
          href="http://localhost:3000"
          target="_blank"
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
          title="View live storefront"
        >
          <Store className="w-4 h-4" />
        </Link>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
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
        <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-semibold">
          AA
        </div>
        <div className="flex flex-col truncate">
          <span className="text-xs font-medium text-slate-900 dark:text-slate-100 truncate">
            Merchant Admin
          </span>
          <span className="text-[11px] text-slate-400 truncate">admin@apexapparel.co</span>
        </div>
      </div>
    </aside>
  );
};
