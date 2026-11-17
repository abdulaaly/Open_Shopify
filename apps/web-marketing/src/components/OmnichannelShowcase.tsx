"use client";

import React, { useState } from "react";
import { Store, ShoppingCart, Bot, Building2, Check, ArrowRight, Laptop, Smartphone, Sparkles, Layers } from "lucide-react";

type TabId = "storefront" | "pos" | "agent" | "b2b";

export function OmnichannelShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>("storefront");

  const tabs = [
    {
      id: "storefront" as TabId,
      name: "Online Store & Customizer",
      subtitle: "Visual split-screen editor & Next.js 15 theme engine",
      icon: Store,
      badge: "Sub-50ms TTFB",
    },
    {
      id: "pos" as TabId,
      name: "Unified POS & Mobile",
      subtitle: "1 Flutter codebase for iOS, Android, macOS & Windows POS",
      icon: ShoppingCart,
      badge: "5 OS Targets",
    },
    {
      id: "agent" as TabId,
      name: "Agentic MCP & AI Copilot",
      subtitle: "Native Model Context Protocol server for autonomous agents",
      icon: Bot,
      badge: "UCP Parity",
    },
    {
      id: "b2b" as TabId,
      name: "Enterprise B2B Wholesale",
      subtitle: "Company hierarchies, custom price lists, and Net 30 terms",
      icon: Building2,
      badge: "Plus Parity",
    },
  ];

  return (
    <section id="omnichannel" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-zinc-800 text-zinc-300 border border-zinc-700">
            Unrivaled Parity
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Sell Everywhere. <br className="hidden sm:inline" />
            Control Everything in One Stack.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Experience the full breadth of modern enterprise commerce without fragmented plugins or exorbitant monthly fees.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-5 rounded-2xl text-left border transition-all relative overflow-hidden group ${
                  isActive
                    ? "border-emerald-500/50 bg-zinc-900 shadow-xl shadow-emerald-500/10"
                    : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/50"
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400" />
                )}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2.5 rounded-xl ${
                      isActive ? "bg-emerald-500/20 text-emerald-400" : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {tab.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                  {tab.name}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{tab.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {activeTab === "storefront" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Online Store 2.0 JSON Parity</span>
                </div>
                <h3 className="text-3xl font-extrabold text-white">
                  Next.js 15 Storefront &amp; Real-Time Visual Theme Customizer
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  Say goodbye to slow Ruby Liquid servers. VENDR parses Shopify Online Store 2.0 JSON schemas into React 19 Server Components with sub-50ms Time-To-First-Byte (TTFB) and instantaneous drag-and-drop section reordering.
                </p>
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Split-screen live preview with desktop, tablet, and mobile viewport toggles</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Slide-out AJAX Cart Drawer with real-time WASM discount evaluation</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>1-Page high-conversion Checkout with zero third-party gateway surcharges</span>
                  </li>
                </ul>
                <div className="pt-2 flex items-center gap-4">
                  <a
                    href="http://localhost:3002"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    <span>Open Theme Customizer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="http://localhost:3000"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-200 hover:text-white text-xs font-semibold"
                  >
                    View Live Storefront
                  </a>
                </div>
              </div>

              {/* Visual preview card */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                  <span>Theme Schema: config/settings_data.json</span>
                  <span className="text-emerald-400">● Live Connected</span>
                </div>
                <div className="space-y-2 text-xs font-mono bg-black/60 p-4 rounded-xl border border-zinc-800/80 text-zinc-300 overflow-x-auto">
                  <p className="text-emerald-400">{`// Dynamic section tree`}</p>
                  <p>{`"sections": {`}</p>
                  <p className="pl-4">{`"hero_banner": { "type": "hero-section", "settings": { "headline": "Summer Drop" } },`}</p>
                  <p className="pl-4">{`"featured_collection": { "type": "product-grid", "settings": { "limit": 8 } },`}</p>
                  <p className="pl-4">{`"promo_banner": { "type": "announcement", "settings": { "code": "VIP20" } }`}</p>
                  <p>{`}`}</p>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-center">
                    <span className="text-[11px] text-zinc-400 block">Lighthouse</span>
                    <span className="text-lg font-black text-emerald-400">99 / 100</span>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-center">
                    <span className="text-[11px] text-zinc-400 block">Render Latency</span>
                    <span className="text-lg font-black text-teal-400">&lt; 32ms</span>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-center">
                    <span className="text-[11px] text-zinc-400 block">Server Actions</span>
                    <span className="text-lg font-black text-blue-400">React 19</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "pos" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Universal OS Matrix: 1 Unified Codebase</span>
                </div>
                <h3 className="text-3xl font-extrabold text-white">
                  Cross-Platform Flutter POS &amp; Mobile Companion
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  No need to purchase expensive proprietary POS hardware ($799 POS Go) or maintain separate React Native and iPad apps. VENDR&apos;s Clean Architecture Flutter app runs natively on iOS, Android, Windows, macOS, and Linux.
                </p>
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Real-time camera barcode scanner and off-the-shelf USB/Bluetooth scanner support</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Offline cart queueing: syncs inventory automatically when connectivity restores</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Instant push notifications for new web orders, low stock warnings, and fulfillment</span>
                  </li>
                </ul>
                <div className="pt-2 flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-700 text-zinc-300">
                    Target: Android (APK/AAB)
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-700 text-zinc-300">
                    iOS (IPA)
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-700 text-zinc-300">
                    Windows (.exe)
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-700 text-zinc-300">
                    Linux (.deb)
                  </span>
                </div>
              </div>

              {/* POS Interface Preview */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                  <span>Terminal: VENDR POS v1.0.0</span>
                  <span className="text-emerald-400">● Scanner Ready</span>
                </div>
                <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Active Session: Register #01 (Main Storefront)</span>
                    <span className="text-zinc-500">Cashier: Admin</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm p-2 rounded bg-zinc-900/80">
                      <span>1x Lumina Pro Headphones</span>
                      <span className="font-mono text-emerald-400">$239.20</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-2 rounded bg-zinc-900/80">
                      <span>2x Precision Travel Case</span>
                      <span className="font-mono text-emerald-400">$78.00</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-zinc-800 flex justify-between items-baseline">
                    <span className="text-xs uppercase text-zinc-400 font-bold">Total Due</span>
                    <span className="text-xl font-black text-white font-mono">$317.20</span>
                  </div>
                </div>
                <button className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
                  <span>Charge Card / Cash / Tap</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === "agent" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Universal Commerce Protocol (UCP) &amp; MCP</span>
                </div>
                <h3 className="text-3xl font-extrabold text-white">
                  Built for AI Agents. Standard Model Context Protocol.
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  While Shopify restricts its AI tools to proprietary networks and closed Sidekick subscriptions, VENDR ships with a native open Model Context Protocol (MCP) server. Any autonomous LLM (Claude, OpenAI, Cursor, Antigravity) can manage your store and execute transactions.
                </p>
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Native tools: <code className="text-xs font-mono text-purple-300">search_catalog</code>, <code className="text-xs font-mono text-purple-300">create_cart</code>, <code className="text-xs font-mono text-purple-300">execute_checkout</code></span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Autonomous pricing optimization and inventory re-order alerts</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Agentic natural language query engine for GMV, customer churn, and cohort analysis</span>
                  </li>
                </ul>
                <div className="pt-2">
                  <div className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 inline-block">
                    $ npx -y @vendr/mcp-server --store-url https://api.vendr.local
                  </div>
                </div>
              </div>

              {/* MCP Tool Inspection Card */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                  <span>MCP Protocol: vendr_mcp_v1</span>
                  <span className="text-purple-400">● 6 Tools Active</span>
                </div>
                <div className="space-y-3 text-xs font-mono bg-black/60 p-4 rounded-xl border border-zinc-800/80 text-zinc-300">
                  <p className="text-purple-400">{`// Agent tool invocation: create_cart`}</p>
                  <p>{`{`}</p>
                  <p className="pl-4">{`"tool": "create_cart",`}</p>
                  <p className="pl-4">{`"arguments": {`}</p>
                  <p className="pl-8">{`"items": [{ "variantId": "var_anc_01", "quantity": 1 }],`}</p>
                  <p className="pl-8">{`"discountCode": "VIP20"`}</p>
                  <p className="pl-4">{`}`}</p>
                  <p>{`}`}</p>
                  <p className="text-emerald-400 pt-2">{`// Tool Response: Cart #ct_8892 created ($239.20)`}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "b2b" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>No $2,300/mo Plus Paywall</span>
                </div>
                <h3 className="text-3xl font-extrabold text-white">
                  Enterprise B2B Wholesale &amp; Tiered Pricing
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  On Shopify, native B2B company accounts, volume tier pricing, and Net 30/60 payment terms are strictly locked behind the $2,300/mo Shopify Plus subscription. VENDR includes complete B2B wholesale capabilities out-of-the-box.
                </p>
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Company hierarchies with multi-user permissions and corporate billing addresses</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Custom price catalogs per customer tier (e.g. Distributor 40% off, Retailer 25% off)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Net 15, Net 30, and Net 60 invoicing terms with PO number collection</span>
                  </li>
                </ul>
              </div>

              {/* B2B Invoicing Preview */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                  <span>Corporate Account: Apex Distribution Ltd.</span>
                  <span className="text-amber-400">Tier: Platinum (40% Off)</span>
                </div>
                <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Payment Terms:</span>
                    <span className="font-semibold text-white">Net 30 Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Credit Limit:</span>
                    <span className="font-semibold text-white">$100,000.00 USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Active PO:</span>
                    <span className="font-mono text-amber-400">PO-2026-8941</span>
                  </div>
                  <div className="pt-2 border-t border-zinc-800 flex justify-between">
                    <span className="text-zinc-400">Wholesale Order Total:</span>
                    <span className="text-base font-bold text-emerald-400 font-mono">$18,450.00</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
