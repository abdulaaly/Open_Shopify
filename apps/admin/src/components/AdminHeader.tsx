"use client";

import React, { useState, useEffect } from "react";
import { Search, Bell, Sparkles, Store, ChevronDown, Check } from "lucide-react";
import { Button } from "@vendr/ui";

interface StoreOption {
  id: string;
  name: string;
  slug: string;
  domain: string;
}

export const AdminHeader: React.FC = () => {
  const [stores, setStores] = useState<StoreOption[]>([
    { id: "ten_apex_apparel", name: "Apex Apparel Co.", slug: "apex-apparel", domain: "apex-apparel.openshopify.local" },
    { id: "ten_karachi_tech", name: "Karachi Tech Hub", slug: "karachi-tech", domain: "karachi-tech.openshopify.local" },
  ]);
  const [activeSlug, setActiveSlug] = useState("apex-apparel");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copilotMessage, setCopilotMessage] = useState("");

  useEffect(() => {
    // Read active store from URL or default
    if (typeof window !== "undefined") {
      const urlTenant = new URLSearchParams(window.location.search).get("tenant");
      if (urlTenant) setActiveSlug(urlTenant);
    }

    // Fetch stores list from API
    fetch("http://localhost:4000/api/v1/stores")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.stores && data.stores.length > 0) {
          setStores(data.stores);
        }
      })
      .catch((err) => console.log("Stores fetch error:", err));
  }, []);

  const handleSelectStore = (slug: string) => {
    setActiveSlug(slug);
    setIsDropdownOpen(false);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tenant", slug);
      window.location.href = url.toString();
    }
  };

  const currentStore = stores.find((s) => s.slug === activeSlug) || stores[0];

  return (
    <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Store Switcher */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 transition-colors text-xs font-semibold text-slate-800 dark:text-slate-100"
        >
          <div className="w-4 h-4 rounded bg-emerald-500/20 text-emerald-600 flex items-center justify-center">
            <Store className="w-3 h-3" />
          </div>
          <span>{currentStore?.name || "Apex Apparel Co."}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {isDropdownOpen && (
          <div className="absolute left-0 top-full mt-1.5 w-64 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl py-1 z-50 animate-in fade-in">
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800">
              Switch Active Store
            </div>
            {stores.map((s) => (
              <button
                key={s.slug}
                onClick={() => handleSelectStore(s.slug)}
                className="w-full px-3 py-2 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-xs"
              >
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-100">{s.name}</div>
                  <div className="text-[10px] font-mono text-slate-400">{s.domain}</div>
                </div>
                {s.slug === activeSlug && <Check className="w-4 h-4 text-emerald-500" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Global Search & Command Palette */}
      <div className="flex items-center gap-2 w-80">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search orders, products, customers..."
            className="w-full h-8 pl-9 pr-14 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-1 rounded text-slate-400">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <a
          href={`http://localhost:3000?tenant=${activeSlug}`}
          target="_blank"
          rel="noreferrer"
          className="text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-medium transition-colors"
        >
          View Storefront
        </a>

        <button
          className="relative p-1.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-1 right-1" />
        </button>

        <Button
          size="sm"
          variant="secondary"
          className="text-xs h-8 gap-1.5"
          onClick={() => alert("Open Shopify AI Copilot: catalog sync, pricing optimization, and automated fulfillment active.")}
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>AI Copilot</span>
        </Button>
      </div>
    </header>
  );
};
