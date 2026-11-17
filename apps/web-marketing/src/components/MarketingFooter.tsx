"use client";

import React from "react";
import Link from "next/link";
import { GitBranch, Shield, Heart } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/10 bg-black text-zinc-400 py-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center font-black text-black text-base">
                O
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Open Shopify</span>
            </div>
            <p className="text-zinc-400 max-w-sm leading-relaxed">
              The high-performance, open-source enterprise commerce engine with OmniShop cross-platform POS. Zero transaction taxes, pure WASM functions, and sovereign data ownership.
            </p>
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[11px]">System Status: All Engines Operational (100% Uptime)</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <span className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Platform
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Fastify Core API
                </a>
              </li>
              <li>
                <a href="#omnichannel" className="hover:text-white transition-colors">
                  Next.js 15 Storefront
                </a>
              </li>
              <li>
                <a href="#omnichannel" className="hover:text-white transition-colors">
                  Theme Customizer
                </a>
              </li>
              <li>
                <a href="#omnichannel" className="hover:text-white transition-colors">
                  OmniShop Mobile &amp; POS
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  ROI Calculator
                </a>
              </li>
            </ul>
          </div>

          {/* Developer Links */}
          <div className="space-y-3">
            <span className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Developers
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#developer" className="hover:text-white transition-colors">
                  GraphQL Storefront API
                </a>
              </li>
              <li>
                <a href="#developer" className="hover:text-white transition-colors">
                  Pure WASM Functions
                </a>
              </li>
              <li>
                <a href="#developer" className="hover:text-white transition-colors">
                  Model Context Protocol
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/abdulaaly/Open_Shopify"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub: Open_Shopify
                </a>
              </li>
            </ul>
          </div>

          {/* Community & Legal */}
          <div className="space-y-3">
            <span className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Ecosystem
            </span>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/abdulaaly/Open_Shopify/blob/main/LICENSE"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Apache 2.0 License
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/abdulaaly/Open_Shopify/blob/main/SECURITY.md"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Security Policy
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/abdulaaly/Open_Shopify/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Contributing Guide
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <p>© 2026 Open Shopify Contributors. Released under Apache License 2.0.</p>
          <p className="max-w-md text-center sm:text-right">
            Shopify is a registered trademark of Shopify Inc. Open Shopify is an independent open-source project and is not affiliated with or endorsed by Shopify Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
